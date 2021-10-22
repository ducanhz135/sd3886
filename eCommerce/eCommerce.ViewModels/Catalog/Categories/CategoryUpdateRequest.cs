using eCommerce.Data.Emuns;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.ViewModels.Catalog.Categories
{
    public class CategoryUpdateRequest
    {
        public int Id { get; set; }

        //public int SortOrder { set; get; }
        //public bool IsShowOnHome { set; get; }
        //public int? ParentId { set; get; }
        //public Status Status { set; get; }

        public string Name { set; get; }
        public string SeoDescription { set; get; }
        public string SeoTitle { set; get; }
        public string SeoAlias { get; set; }
        public string LanguageId { set; get; }
    }
}
