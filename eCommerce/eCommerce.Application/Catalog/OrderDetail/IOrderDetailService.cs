using eCommerce.ViewModels.Catalog.Order;
using eCommerce.ViewModels.Catalog.OrderDetail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.OrderDetail
{
    public interface IOrderDetailService
    {
        Task<int> Create(OrderDetailCreatedRequest request);
        
    }
}
