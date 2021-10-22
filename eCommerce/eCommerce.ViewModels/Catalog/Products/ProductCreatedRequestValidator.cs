using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.ViewModels.Catalog.Products
{
    public class ProductCreatedRequestValidator : AbstractValidator<ProductCreatedRequest>
    {
        public ProductCreatedRequestValidator()
        {
            RuleFor(x => x.Price).NotEmpty().WithMessage("Price is required").GreaterThan(0).WithMessage("price must greater than 0");
            RuleFor(x => x.OriginalPrice).NotEmpty().WithMessage("Original Price is required").GreaterThan(0).WithMessage("original price must greater than 0");
            RuleFor(x => x.Stock).NotEmpty().WithMessage("Stock is required").GreaterThan(0).WithMessage("Stock must greater than 0");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required").MinimumLength(2).WithMessage("Name must contain atleast two character");
            RuleFor(x => x.LanguageId).NotEmpty().WithMessage("Language is required").MinimumLength(2);


        }

    }
}
