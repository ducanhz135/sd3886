using eCommerce.Data.EF;
using eCommerce.Data.Entities;
using eCommerce.Utilities.Exceptions;
using eCommerce.ViewModels.Catalog.Categories;
using eCommerce.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.Application.Catalog.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly ECommerceDbContext _context;

        public CategoryService(ECommerceDbContext context)
        {
            _context = context;

        }

        public async Task<int> Create(CategoryCreatedRequest request)
        {
            var category = new Category()
            {
                SortOrder = request.SortOrder,
                IsShowOnHome = request.IsShowOnHome,
                ParentId = request.ParentId,
                Status = request.Status,

                CategoryTranslations = new List<CategoryTranslation>()
                {
                    new CategoryTranslation()
                    {
                        Name =  request.Name,
                        SeoDescription = request.SeoDescription,
                        SeoTitle = request.SeoTitle,
                        SeoAlias = request.SeoAlias,
                        LanguageId = request.LanguageId,
                        
                    }
                }
            };


            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category.Id;
        }

        public async Task<int> Delete(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);

            if (category == null) throw new ECommerceException($"Cannot find a category: {categoryId}");

            //var images = _context.ProductImages.Where(i => i.ProductId == productId);
            //foreach (var image in images)
            //{
            //    await _storageService.DeleteFileAsync(image.ImagePath);
            //}

            _context.Categories.Remove(category);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<CategoryViewModel>> GetAll()
        {
            //1. Select join
            var query = from c in _context.Categories
                        join ct in _context.CategoryTranslations on c.Id equals ct.CategoryId
                        select new { c, ct };

            var data = await query.Select(x => new CategoryViewModel()
            {
                Id = x.c.Id,
                SortOrder = x.c.SortOrder,
                IsShowOnHome = x.c.IsShowOnHome,
                ParentId = x.c.ParentId,
                Status = x.c.Status,

                Name = x.ct.Name,
                SeoDescription = x.ct.SeoDescription,
                SeoTitle = x.ct.SeoTitle,
                LanguageId = x.ct.LanguageId,
                SeoAlias = x.ct.SeoAlias,
            }).ToListAsync();

            return data;


        }

        public async Task<List<CategoryViewModel>> GetAllByLanguage(string languageId)
        {
            //1. Select join
            var query = from c in _context.Categories
                        join ct in _context.CategoryTranslations on c.Id equals ct.CategoryId
                        select new { c, ct };

            var data = await query.Where(x=>x.ct.LanguageId == languageId).Select(x => new CategoryViewModel()
            {
                Id = x.c.Id,
                SortOrder = x.c.SortOrder,
                IsShowOnHome = x.c.IsShowOnHome,
                ParentId = x.c.ParentId,
                Status = x.c.Status,

                Name = x.ct.Name,
                SeoDescription = x.ct.SeoDescription,
                SeoTitle = x.ct.SeoTitle,
                LanguageId = x.ct.LanguageId,
                SeoAlias = x.ct.SeoAlias,
            }).ToListAsync();

            return data;
        }

        public Task<PagedResult<CategoryViewModel>> GetAllPaging(GetPublicCategoryPagingRequest request)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<CategoryViewModel>> GetAllPaging(GetManageCategoryPagingRequest request)
        {
            //1. Select join
            var query = from c in _context.Categories
                        join ct in _context.CategoryTranslations on c.Id equals ct.CategoryId
                        select new { c, ct };
            //2. filter
            if (!string.IsNullOrEmpty(request.Keyword))
                query = query.Where(x => x.ct.Name.Contains(request.Keyword));

            //if (request.CategoryIds.Count > 0)
            //{
            //    query = query.Where(p => request.CategoryIds.Contains(p.pic.CategoryId));
            //}
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new CategoryViewModel()
                {
                    Id = x.c.Id,
                    SortOrder = x.c.SortOrder,
                    IsShowOnHome = x.c.IsShowOnHome,
                    ParentId = x.c.ParentId,
                    Status = x.c.Status,

                    Name = x.ct.Name,
                    SeoDescription = x.ct.SeoDescription,
                    SeoTitle = x.ct.SeoTitle,
                    LanguageId = x.ct.LanguageId,               
                    SeoAlias = x.ct.SeoAlias,

                }).ToListAsync();

            //4. Select and projection
            var pagedResult = new PagedResult<CategoryViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<CategoryViewModel> GetById(int categoryId, string languageId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            
            var categoryTranslation = await _context.CategoryTranslations.FirstOrDefaultAsync(x => x.CategoryId == categoryId
            && x.LanguageId == languageId);

            var categoryViewModel = new CategoryViewModel()
            {
                Id = category.Id,
                SortOrder = category.SortOrder,
                IsShowOnHome = category.IsShowOnHome,
                ParentId = category.ParentId,
                Status = category.Status,

                Name = categoryTranslation.Name,
                SeoDescription = categoryTranslation.SeoDescription,
                SeoTitle = categoryTranslation.SeoTitle,
                LanguageId = categoryTranslation.LanguageId,
                SeoAlias = categoryTranslation.SeoAlias,

            };

            return categoryViewModel;
        }

        public async Task<CategoryViewModel> GetByProductId(int productId, string languageId)
        {
            //1. Select join
            var query = from p in _context.Products
                        //join pt in _context.ProductTranslations on p.Id equals pt.ProductId
                        join pic in _context.ProductInCategories on p.Id equals pic.ProductId
                        join c in _context.Categories on pic.CategoryId equals c.Id
                        join pt in _context.CategoryTranslations on c.Id equals pt.CategoryId
                        select new { p, pic, c,pt };
            

            if (productId > 0)
            {
                query = query.Where(p => p.pic.ProductId == productId);
            }
            

            var data = await query.Select(x => new CategoryViewModel()
                {
                    Id = x.p.Id,
                    Name = x.pt.Name,
                    

                }).FirstOrDefaultAsync();

            
            return data;
        }

        public async Task<int> Update(CategoryUpdateRequest request)
        {
            var category = await _context.Categories.FindAsync(request.Id);

            var categoryTranslations = await _context.CategoryTranslations
                .FirstOrDefaultAsync(x => x.CategoryId == request.Id && x.LanguageId == request.LanguageId);

            if (category == null || categoryTranslations == null) throw new ECommerceException($"Cannot find a category with id: {request.Id}");

            categoryTranslations.Name = request.Name;
            categoryTranslations.SeoAlias = request.SeoAlias;
            categoryTranslations.SeoDescription = request.SeoDescription;
            categoryTranslations.SeoTitle = request.SeoTitle;


            return await _context.SaveChangesAsync();
        }
    }
}
