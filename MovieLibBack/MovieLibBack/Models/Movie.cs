using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MovieLibBack.Models
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        public string MovieName { get; set; }
        public int? MovieLength { get; set; }
        public string Language { get; set; }
        public int? Year { get; set; }

        public virtual ICollection<MovieGenre> MovieGenres { get; set; }
        public virtual ICollection<MovieImage> MovieImages { get; set; }
    }
}