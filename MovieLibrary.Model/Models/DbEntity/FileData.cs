using System.Collections.Generic;

namespace MovieLibrary.Model
{
    public class FileData
    {
        public int FileDataId { get; set; }
        public byte[] Data { get; set; }
        public virtual ICollection<FileInfo> FileInfo { get; set; }
    }
}