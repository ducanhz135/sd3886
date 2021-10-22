using eCommerce.ViewModels.Catalog.ProductRatings;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.ProductRatings
{
    public interface IProductRatingService
    {
        Task<List<ProductRatingViewModel>> GetByProductId(int productId);
        Task<int> AddRating(ProductRatingCreatedRequest request);
    }
}
