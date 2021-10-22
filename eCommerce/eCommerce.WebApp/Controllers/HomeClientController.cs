using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Catalog.ProductRatings;
using eCommerce.Application.Catalog.Products;
using eCommerce.ViewModels.Catalog.ProductRatings;
using eCommerce.ViewModels.Catalog.Products;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.WebApp.Controllers
{
    public class HomeClientController : Controller
    {
        private readonly IManageProductService _manageProductService;
        private readonly IPublicProductService _publicProductService;
        private readonly IProductRatingService _productRatingService;

        
        public HomeClientController(
            IManageProductService manageProductService, IProductRatingService productRatingService, IPublicProductService publicProductService)
        {
            _manageProductService = manageProductService;
            _productRatingService = productRatingService;
            _publicProductService = publicProductService;
        }

        
        public IActionResult Index()
         {
            var productRequest = new GetPublicProductPagingRequest() {
                PageIndex = 1,
                PageSize = 5,
            };

            var products = _manageProductService.GetAllPaging(productRequest);
            ViewBag.NewProducts = products.Result.Items;
            return View();
        }

        public IActionResult ProductCategory(int Id)
        {
            var request = new GetPublicProductPagingRequest()
            {
                CategoryId = Id,
                PageIndex = 1,
                PageSize = 5,
            };
            var language = "en-US";
            var products = _publicProductService.GetAllByCategoryId(language, request).Result;

            return View(products.Items);
        }

        public IActionResult ShowComment(int id)
        {
            var ratings = _productRatingService.GetByProductId(id).Result;
            ViewBag.ProductId = id;

            return View(ratings);    
        }

        public async Task<IActionResult> AddComment(int productId, int rating, string productComment)
        {
            var userId = "2494bee7-f8e6-431b-91d9-08d8241198cd";
            var productRating = new ProductRatingCreatedRequest()
            {
                ProductId = productId,
                CommentDescription = productComment,
                Rating = rating,
                CommentedOn = DateTime.Now,
                UserId = Guid.Parse(userId),
            };
            var result = await _productRatingService.AddRating(productRating);
            return RedirectToAction("Index");
        }
    }
}
