using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Catalog.Categories;
using eCommerce.ViewModels.Catalog.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(
            ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = await _categoryService.GetAll();
            return Ok(categories);
        }

        
        [HttpGet("{categoryId}/{languageId}")]
        public async Task<IActionResult> GetById(int categoryId, string languageId)
        {
            var category = await _categoryService.GetById(categoryId, languageId);
            if (category == null)
                return BadRequest("Cannot find category");

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm]CategoryCreatedRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categoryId = await _categoryService.Create(request);
            if (categoryId == 0)
                return BadRequest();

            var category = await _categoryService.GetById(categoryId, request.LanguageId);

            return CreatedAtAction(nameof(GetById), new { id = categoryId }, category);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm]CategoryUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var affectedResult = await _categoryService.Update(request);
            if (affectedResult == 0)
                return BadRequest();

            return Ok();
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> Delete(int categoryId)
        {
            var affectedResult = await _categoryService.Delete(categoryId);
            if (affectedResult == 0)
                return BadRequest();
            return Ok();
        }


    }
}