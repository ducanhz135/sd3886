
using eCommerce.ViewModels.Catalog.Order;
using System.Threading.Tasks;

namespace eCommerce.Application.Catalog.Order
{
    public interface IOrderService
    {
        Task<int> Create(OrderCreatedRequest request);
        Task<OrderViewModel> GetById(int orderId);
    }
}
