using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibBack.Models
{
    public class MovieImage
    {
        public int MovieId { get; set; }
        public int FileInfoId { get; set; }
        public int ImageTypeId { get; set; }

        public virtual Movie Movie { get; set; }
        public virtual FileInfo FileInfo { get; set; }
        public virtual ImageClassification ImageClassification { get; set; }
    }
}