using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Catalog.Categories;
using eCommerce.Application.Catalog.ProductCategories;
using eCommerce.Application.Catalog.Products;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.WebApp.Controllers
{
    public class ProductController : Controller
    {
        private readonly IManageProductService _manageProductService;
        private readonly ICategoryService _categoryService;
        public ProductController(IManageProductService manageProductService,
            ICategoryService categoryService)
        {

            _manageProductService = manageProductService;
            _categoryService = categoryService;
        }

        [Route("product/{id}")]
        public IActionResult Index(int Id)
        {
            var language = "en-US";
            var product = _manageProductService.GetClientProductById(Id, language).Result;
            ViewBag.Category = _categoryService.GetByProductId(product.Id, language).Result;
            return View(product);
        }
    }
}
