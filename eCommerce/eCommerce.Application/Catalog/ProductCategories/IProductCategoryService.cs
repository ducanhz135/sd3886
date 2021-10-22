using eCommerce.ViewModels.Catalog.ProductCategories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.ProductCategories
{
    public interface IProductCategoryService
    {
        Task<int> Create(ProductCategoryCreatedRequest request);

        Task<ProductCategoryViewModel> GetById(int productId, int categoryId);
        Task<ProductCategoryViewModel> GetCategory(int productId);

        Task<List<ProductCategoryViewModel>> GetAll();
    }
}
