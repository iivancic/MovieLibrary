using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MovieLibBack.Models
{
    public partial class MovieDescription
    {
        [Key]
        public int DescriptionId { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Trivia { get; set; }
    }
}
