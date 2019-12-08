using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibBack.Models
{
    public class FileInfo
    {
        public int FileInfoId { get; set; }
        public int FileDataId { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public int Size { get; set; }

        public virtual FileData FileData { get; set; }
        public virtual ICollection<MovieImage> MovieImages { get; set; }
    }
}