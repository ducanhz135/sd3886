using eCommerce.ViewModels.Catalog.Categories;
using eCommerce.ViewModels.Catalog.Products;
using eCommerce.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.Categories
{
    public interface ICategoryService
    {
        Task<int> Create(CategoryCreatedRequest request);

        Task<int> Update(CategoryUpdateRequest request);

        Task<int> Delete(int categoryId);

        Task<PagedResult<CategoryViewModel>> GetAllPaging(GetManageCategoryPagingRequest request);
        Task<PagedResult<CategoryViewModel>> GetAllPaging(GetPublicCategoryPagingRequest request);

        Task<CategoryViewModel> GetById(int categoryId, string languageId);
        Task<CategoryViewModel> GetByProductId(int productId, string languageId);

        Task<List<CategoryViewModel>> GetAll();

        Task<List<CategoryViewModel>> GetAllByLanguage(string languageId);

    }
}
