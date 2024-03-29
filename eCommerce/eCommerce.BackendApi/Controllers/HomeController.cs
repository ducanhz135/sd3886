﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using eCommerce.BackendApi.Models;
using eCommerce.Application.Catalog.Products;

namespace eCommerce.BackendApi.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPublicProductService _publicProductService;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return Ok();
        }

    }
}
