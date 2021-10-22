using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebApp.Components
{
    public class HeaderCart : ViewComponent
    {

        public IViewComponentResult Invoke()
        {

            return View();
        }
    }
}
