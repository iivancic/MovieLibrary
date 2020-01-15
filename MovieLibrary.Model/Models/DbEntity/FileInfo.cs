using System.Collections.Generic;

namespace MovieLibrary.Model
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