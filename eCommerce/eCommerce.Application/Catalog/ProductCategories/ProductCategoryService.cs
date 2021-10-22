using eCommerce.Data.EF;
using eCommerce.Data.Entities;
using eCommerce.ViewModels.Catalog.ProductCategories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.ProductCategories
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly ECommerceDbContext _context;
        public ProductCategoryService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<int> Create(ProductCategoryCreatedRequest request)
        {
            var productategory = new ProductInCategory()
            {
                ProductId = request.ProductId,
                CategoryId = request.CategoryId,
                
                
            };

            _context.ProductInCategories.Add(productategory);
            return await _context.SaveChangesAsync();
        }

        public Task<List<ProductCategoryViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ProductCategoryViewModel> GetById(int productId, int categoryId)
        {
            throw new NotImplementedException();
        } 
        
        public async Task<ProductCategoryViewModel> GetCategory(int productId)
        {
            var productCategory = await _context.ProductInCategories.FindAsync(productId, null);
            if(productCategory != null)
            {
                return new ProductCategoryViewModel()
                {
                    ProductId = productCategory.ProductId,
                    CategoryId = productCategory.CategoryId,
                };
            }
            return new ProductCategoryViewModel();
        }
    }
}
