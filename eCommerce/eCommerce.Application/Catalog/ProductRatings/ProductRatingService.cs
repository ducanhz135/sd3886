using eCommerce.Data.EF;
using eCommerce.Data.Entities;
using eCommerce.ViewModels.Catalog.ProductRatings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.ProductRatings
{
    public class ProductRatingService : IProductRatingService
    {
        private readonly ECommerceDbContext _context;

        public ProductRatingService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddRating(ProductRatingCreatedRequest request)
        {
            var productRating = new ProductRating()
            {
                ProductId = request.ProductId,
                CommentDescription = request.CommentDescription,
                Rating = request.Rating,
                CommentedOn = request.CommentedOn,
                UserId = request.UserId,

            };

            _context.ProductRatings.Add(productRating);
            var res = await _context.SaveChangesAsync();
            return productRating.Id;
        }

        public async Task<List<ProductRatingViewModel>> GetByProductId(int productId)
        {
            var productRatings = await _context.ProductRatings.Where(x => x.ProductId == productId)
                .Select(x => new ProductRatingViewModel()
            {
                Id = x.Id,
                ProductId = x.ProductId,
                UserId = x.UserId,
                CommentDescription = x.CommentDescription,
                CommentedOn = x.CommentedOn,
                Rating = x.Rating,
            }).ToListAsync();

            return productRatings;
        }


    }
}
