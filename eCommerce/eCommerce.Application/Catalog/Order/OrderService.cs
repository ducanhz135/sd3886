using eCommerce.Data.EF;
using eCommerce.ViewModels.Catalog.Order;
using System;
using System.Collections.Generic;
using eCommerce.Data.Entities;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.Order
{
    public class OrderService : IOrderService
    {
        private readonly ECommerceDbContext _context;

        public OrderService(ECommerceDbContext context)
        {
            _context = context;

        }

        public async Task<int> Create(OrderCreatedRequest request)
        {
            var order = new eCommerce.Data.Entities.Order()
            {
                 OrderDate = request.OrderDate,
                 ShipName = request.ShipName,
                 ShipAddress = request.ShipAddress,
                 ShipEmail = request.ShipEmail,
                 ShipPhoneNumber = request.ShipPhoneNumber,
                 Status = request.Status,
                 UserId = request.UserId,
            };


            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order.Id;
        }

        public async Task<OrderViewModel> GetById(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);


            var productViewModel = new OrderViewModel()
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                ShipAddress = order.ShipAddress,
                ShipEmail = order.ShipEmail,
                ShipName = order.ShipName,
                ShipPhoneNumber = order.ShipPhoneNumber,
                UserId = order.UserId,
                Status = order.Status,


            };

            return productViewModel;
        }
    }
}
