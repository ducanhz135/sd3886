﻿using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.ViewModels.System.Users
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            //RuleFor(x => x.UserName).NotEmpty().WithMessage("User name is required");
            //RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required")
            //    .MinimumLength(3).WithMessage("Password is at least 3 characters");
        }
    }
}
