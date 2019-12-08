using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
using System.Linq;

namespace MovieLibrary.Service
{
    public class MovieService
    {
        public void RemoveMovieById()
        {
            using var context = new MovieLibraryContext();
            var movie = new Movie { MovieId = 2 };
            context.Movie.Remove(movie);
            context.SaveChanges();
        }

        public List<Movie> Query()
        {
            using var context = new MovieLibraryContext();
            return context.Movie
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
                .ToList();
        }

        /*
        public void ImageToDb(string filePath)
        {
            var image = File.ReadAllBytes(filePath);
            var imageBase64 = Convert.ToBase64String(image);

            using var context = new MovieLibraryContext();
            //var carouselImage = new CarouselImages
            {
                CarouselImage = imageBase64
            };

            context.CarouselImages.Add(carouselImage);
            context.SaveChanges();
        }
        */

        public void AddMovie()
        {
            using var context = new MovieLibraryContext();
            var movie = new Movie
            {
                MovieLength = 209,
                MovieName = "The Irishman 2",
                Year = 2019,
                Language = "EN",
                MovieGenres = new List<MovieGenre>
                {
                    new MovieGenre
                    {
                        Genre = new Genre
                        {
                            GenreId = 1
                        }
                    }
                }
            };

            context.Movie.Add(movie);
            context.SaveChanges();
        }
    }
}