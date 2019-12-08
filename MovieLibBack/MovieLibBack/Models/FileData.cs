using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibBack.Models
{
    public class FileData
    {
        public int FileDataId { get; set; }
        public byte[] Data { get; set; }
        public virtual ICollection<FileInfo> FileInfo { get; set; }
    }
}