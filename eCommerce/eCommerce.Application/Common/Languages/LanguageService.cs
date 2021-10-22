using eCommerce.Data.EF;
using eCommerce.ViewModels.Catalog.Languages;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.Application.Common.Languages
{
    public class LanguageService : ILanguageService
    {

        private readonly ECommerceDbContext _context;

        public LanguageService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<List<LanguageViewModel>> GetAllLanguages()
        {
            var query = from l in _context.Languages
                        select new { l };

            var data = await query.Select(x => new LanguageViewModel()
            {
                Id = x.l.Id,
                Name = x.l.Name,
                IsDefault = x.l.IsDefault,
                
            }).ToListAsync();

            return data;
        }
    }
}
