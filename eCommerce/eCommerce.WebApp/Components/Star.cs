using eCommerce.Application.Catalog.ProductRatings;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebApp.Components
{
    public class Star : ViewComponent
    {
        private readonly IProductRatingService _productRatingService;
        public Star(IProductRatingService productRatingService)
        {
            _productRatingService = productRatingService;
        }

        public IViewComponentResult Invoke(int id)
        {
            var ratings = _productRatingService.GetByProductId(id).Result;
            if (ratings.Count > 0)
            {
                var avgRating = ratings.Average(r => r.Rating);
                ViewBag.AverageRating = avgRating;
                ViewBag.OddRating = avgRating % 1;
                ViewBag.RoundRating = Math.Floor((double)avgRating);
            }
            else
            {
                ViewBag.AverageRating = 0;
                ViewBag.OddRating = 0;
                ViewBag.RoundRating = 0;
            }
            
            return View();
        }
    }
}
