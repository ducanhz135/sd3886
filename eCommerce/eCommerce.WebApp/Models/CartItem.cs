using eCommerce.ViewModels.Catalog.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebApp.Models
{
    public class CartItem
    {
        public PublicProductViewModel Product {get;set;}
        public int Quantity { get; set; }
    }
}
