using eCommerce.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Data.Configurations
{
    public class ProductRatingConfiguration : IEntityTypeConfiguration<ProductRating>
    {
        public void Configure(EntityTypeBuilder<ProductRating> builder)
        {
            builder.ToTable("ProductRatings");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();


            builder.Property(x => x.UserId).IsRequired();

            builder.Property(x => x.Rating).IsRequired();

            builder.Property(x => x.CommentedOn).IsRequired().HasDefaultValue(DateTime.Now);

            builder.HasOne(t => t.Product).WithMany(pr => pr.ProductRatings)
                .HasForeignKey(pc => pc.ProductId);
        }
    }
}
