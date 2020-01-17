using System;
using System.Collections.Generic;
using System.Text;

namespace MovieLibrary.Model
{
    public class ImageByType
    {
        public byte PosterImage { get; set; }
        public byte BackgroundImage { get; set; }
        public byte[] CarouselImages { get; set; }
    }
}
