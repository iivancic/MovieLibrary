using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MovieLibrary.Model
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        public string MovieName { get; set; }
        public int? MovieLength { get; set; }
        public string Language { get; set; }
        public int? Year { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Trivia { get; set; }

        public virtual ICollection<MovieGenre> MovieGenres { get; set; }
        public virtual ICollection<MovieImage> MovieImages { get; set; }
    }
}