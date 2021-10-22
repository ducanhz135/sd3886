using eCommerce.Data.Emuns;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.ViewModels.Catalog.Order
{
    public class OrderCreatedRequest
    {
        public DateTime OrderDate { set; get; }
        public Guid UserId { set; get; }
        public string ShipName { set; get; }
        public string ShipAddress{ set; get; }
        public string ShipEmail { set; get; }
        public string ShipPhoneNumber { set; get; }
        public OrderStatus Status { set; get; }
    }
}
