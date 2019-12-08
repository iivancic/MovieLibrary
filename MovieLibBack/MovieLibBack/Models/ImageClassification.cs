using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibBack.Models
{
    public class ImageClassification
    {
        public int ImageTypeId { get; set; }
        public string ImageType { get; set; }
        public virtual ICollection<MovieImage> MovieImages { get; set; }
    }
}