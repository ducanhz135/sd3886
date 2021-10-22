using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Data.Entities
{
    public class ProductRating
    {
        public int Id { set; get; }
        public int ProductId { set; get; }
        public Guid UserId { set; get; }
        public string CommentDescription { set; get; }
        public int Rating { set; get; }
        public DateTime CommentedOn { set; get; }
        public Product Product { get; set; }

    }
}
