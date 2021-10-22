using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebApp.Components
{
    public class MainMenu : ViewComponent
    {
        public MainMenu()
        {
        }

        public IViewComponentResult Invoke()
        {

            return View();
        }

    }
}
