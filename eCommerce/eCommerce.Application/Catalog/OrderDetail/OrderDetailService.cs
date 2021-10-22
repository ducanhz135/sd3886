using eCommerce.Data.EF;
using eCommerce.ViewModels.Catalog.OrderDetail;
using eCommerce.Data.Entities;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using eCommerce.ViewModels.Catalog.Order;

namespace eCommerce.Application.Catalog.OrderDetail
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly ECommerceDbContext _context;

        public OrderDetailService(ECommerceDbContext context)
        {
            _context = context;

        }

        public async Task<int> Create(OrderDetailCreatedRequest request)
        {
            var orderDetail = new eCommerce.Data.Entities.OrderDetail()
            {
                OrderId = request.OrderId,
                ProductId = request.ProductId,
                Price = request.Price,
                Quantity = request.Quantity,
                
            };


            _context.OrderDetails.Add(orderDetail);
            return await _context.SaveChangesAsync();
        }

        
    }
}
