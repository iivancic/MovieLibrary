using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace MovieLibrary.Model
{
    public class MovieModel
    {
        public MovieModel()
        {
            Genres = new List<int>();
        }

        public MovieModel(Movie entity)
        {
            MovieId = entity.MovieId;
            MovieName = entity.MovieName;
            MovieLength = entity.MovieLength;
            Language = entity.Language;
            Year = entity.Year;
            ShortDescription = entity.ShortDescription;
            LongDescription = entity.LongDescription;
            Trivia = entity.Trivia;

            if (entity.MovieGenres != null)
            {
                Genres = entity.MovieGenres.Select(x => x.GenreId).ToList();
            }
        }

        public int? MovieId { get; set; }
        public string MovieName { get; set; }
        public int? MovieLength { get; set; }
        public string Language { get; set; }
        public int? Year { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Trivia { get; set; }
        public List<int> Genres { get; set; }

        public Movie ToEntity()
        {
            return new Movie
            {
                MovieId = MovieId ?? default,
                MovieName = MovieName,
                MovieLength = MovieLength,
                Language = Language,
                Year = Year,
                ShortDescription = ShortDescription,
                LongDescription = LongDescription,
                Trivia = Trivia,
                MovieGenres = Genres.Select(x => new MovieGenre { GenreId = x }).ToList()
            };
        }
    }
}