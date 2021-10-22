using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.ViewModels.Catalog.OrderDetail
{
    public class OrderDetailCreatedRequest
    {
        public int OrderId { set; get; }
        public int ProductId { set; get; }
        public int Quantity { set; get; }
        public decimal Price { set; get; }
    }
}
