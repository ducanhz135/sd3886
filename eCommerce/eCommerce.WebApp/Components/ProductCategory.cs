
using eCommerce.Application.Catalog.Categories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebApp.Components
{
    public class ProductCategory : ViewComponent
    {
        private readonly ICategoryService _categoryService;
        public ProductCategory(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        public IViewComponentResult Invoke()
        {
            var language = "en-US";
            var categories = _categoryService.GetAllByLanguage(language).Result;

            return View(categories);
        }

    }
}
