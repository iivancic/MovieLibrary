using System;
using System.Collections.Generic;
using System.Text;

namespace MovieLibrary.Model
{
    public class InfoData
    {
        public int FileInfoId { get; set; }
        public int FileDataId { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        public int? Size { get; set; }

    }
}
