using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Common.Languages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class LanguagesController : ControllerBase
    {
        private readonly ILanguageService _languageService;
        public LanguagesController(
            ILanguageService languageService)
        {
            _languageService = languageService;
            
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var languages = await _languageService.GetAllLanguages();
            
            return Ok(languages);
        }

    }
}