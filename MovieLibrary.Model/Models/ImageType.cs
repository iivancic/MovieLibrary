using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibrary.Model
{
    public class ImageType
    {
        public int ImageTypeId { get; set; }
        public string TypeName { get; set; }
        public virtual ICollection<MovieImage> MovieImages { get; set; }
    }
}