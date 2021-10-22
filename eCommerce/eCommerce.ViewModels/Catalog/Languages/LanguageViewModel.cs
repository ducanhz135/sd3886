using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.ViewModels.Catalog.Languages
{
    public class LanguageViewModel
    {
        public string Id { set; get; }
        public string Name { set; get; }
        public bool IsDefault { get; set; }
    }
}
