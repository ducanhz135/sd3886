using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Application.Catalog.Categories;
using eCommerce.Application.Catalog.Order;
using eCommerce.Application.Catalog.OrderDetail;
using eCommerce.Application.Catalog.ProductCategories;
using eCommerce.Application.Catalog.ProductRatings;
using eCommerce.Application.Catalog.Products;
using eCommerce.Application.Common;
using eCommerce.Data.EF;
using eCommerce.Utilities.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace eCommerce.WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddDbContext<ECommerceDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString(SystemConstants.MainConnectionString)));

            services.AddTransient<IStorageService, FileStorageService>();
            services.AddTransient<IManageProductService, ManageProductService>();
            services.AddTransient<IPublicProductService, PublicProductService>();
            services.AddTransient<IProductRatingService, ProductRatingService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IProductCategoryService, ProductCategoryService>();
            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<IOrderDetailService, OrderDetailService>();


            services.AddDistributedMemoryCache();
            services.AddSession();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/HomeClient/Error");
            }

            app.UseStaticFiles();
            app.UseSession();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=HomeClient}/{action=Index}/{id?}");
            });
        }
    }
}
