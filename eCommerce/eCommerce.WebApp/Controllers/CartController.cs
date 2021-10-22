using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.WebApp.Helpers;
using eCommerce.WebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using eCommerce.Application.Catalog.Products;
using eCommerce.Data.Entities;
using eCommerce.Data.Emuns;
using eCommerce.Application.Catalog.Order;
using eCommerce.Application.Catalog.OrderDetail;
using eCommerce.ViewModels.Catalog.Order;
using eCommerce.ViewModels.Catalog.OrderDetail;

namespace eCommerce.WebApp.Controllers
{
    [Route("cart")]
    public class CartController : Controller
    {
        private readonly IManageProductService _manageProductService;
        private readonly IOrderService _orderService;
        private readonly IOrderDetailService _orderDetailService;
        public CartController(
            IManageProductService manageProductService, 
            IOrderService orderService,
            IOrderDetailService orderDetailService)
        {
            _manageProductService = manageProductService;
            _orderService = orderService;
            _orderDetailService = orderDetailService;
        }

        [Route("index")]
        public IActionResult Index()
        {
            var cart = SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session,"cart");
            ViewBag.cart = cart;
            ViewBag.total = cart.Sum(x=>x.Product.Price * x.Quantity);
            
            return View();
        }

        [Route("buy/{id}")]
        public IActionResult Buy(int id)
        {
            var product = _manageProductService.GetClientProductById(id, "en-US").Result;
            
            if (SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart") == null)
            {
                var cart = new List<CartItem>();
                cart.Add(new CartItem() { Product = product , Quantity = 1});
                SessionHelper.SetObjectAsJson(HttpContext.Session, "cart",cart);

            }
            else
            {
                var carts = SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart");

                var index = Exists(carts, id);
                if (index == -1)
                {
                    carts.Add(new CartItem() { Product = product, Quantity = 1 });
                }
                else
                {
                    carts[index].Quantity++;
                }
                SessionHelper.SetObjectAsJson(HttpContext.Session, "cart", carts);
            }

            return RedirectToAction("Index");
        }

        [Route("remove/{id}")]
        public IActionResult Remove(int id)
        {
            
            
                var carts = SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart");

                var index = Exists(carts, id);
                carts.RemoveAt(index);

                SessionHelper.SetObjectAsJson(HttpContext.Session, "cart", carts);
            

            return RedirectToAction("Index");
        }

        private int Exists(List<CartItem> carts, int id)
        {
            for (int i = 0; i < carts.Count; i++)
            {
                if (carts[i].Product.Id == id)
                    return i;
            }
            
            return -1;
        }

        [HttpGet]
        public IActionResult Payment()
        {
            var cart = SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart");
            if(cart == null)
            {
                cart = new List<CartItem>();
            }
            
            return View(cart);
        }

        [HttpPost]
        public IActionResult Payment(string shipName, string mobile, string address, string email, OrderStatus status)
        {

            if (!ModelState.IsValid)
            {
                return RedirectToAction("Error");
            }
            var userId = "2494bee7-f8e6-431b-91d9-08d8241198cd";

            var orderCreatedRequest = new OrderCreatedRequest()
            {
                UserId = Guid.Parse(userId),
                OrderDate = DateTime.Now,
                ShipAddress = address,
                ShipEmail = email,
                ShipName = shipName,
                ShipPhoneNumber = mobile,
                Status = status,
            };

            var orderId = _orderService.Create(orderCreatedRequest).Result;
            if (orderId == 0)
                return RedirectToAction("Error");

            var cart = SessionHelper.GetObjectFromJson<List<CartItem>>(HttpContext.Session, "cart");

            foreach (var item in cart)
            {
                var orderDetail = new OrderDetailCreatedRequest();
                orderDetail.ProductId = item.Product.Id;
                orderDetail.OrderId = orderId;
                orderDetail.Price = item.Product.Price;
                orderDetail.Quantity = item.Quantity;
                var result = _orderDetailService.Create(orderDetail).Result;

            }

            return RedirectToAction("Success");
        }
        [Route("Success")]
        public IActionResult Success()
        {
            return View();
        }

    }
}
