using eCommerce.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.ViewModels.Catalog.Categories
{
    public class GetManageCategoryPagingRequest : PagingRequestBase
    {
        public string Keyword { get; set; }

    }
}
