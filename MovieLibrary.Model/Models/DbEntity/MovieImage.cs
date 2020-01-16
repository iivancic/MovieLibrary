using System.Collections.Generic;

namespace MovieLibrary.Model
{
    public class MovieImage
    {
        public int MovieId { get; set; }
        public int FileInfoId { get; set; }
        public int ImageTypeId { get; set; }

        public virtual Movie Movie { get; set; }
        public virtual FileInfo FileInfo { get; set; }
        public virtual ImageType ImageType { get; set; }
    }
}