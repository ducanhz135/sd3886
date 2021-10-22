using eCommerce.ViewModels.Catalog.Languages;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Common.Languages
{
    public interface ILanguageService
    {
        Task<List<LanguageViewModel>> GetAllLanguages();
    }
}
