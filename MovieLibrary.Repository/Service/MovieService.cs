using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibrary.Service
{
    public class MovieService
    {
        private readonly MovieLibraryContext _context;

        public MovieService()
        {
            _context = new MovieLibraryContext();
        }

        public Task<List<Movie>> QueryAll()
        {
            return _context.Movie.ToListAsync();
        }

        public async Task<PageTableResult<Movie>> GetTableAsync(TableParameters tableParameters)
        {
            var query = _context.Movie.AsQueryable();
             query.Include(x => x.MovieGenres);
            if (!string.IsNullOrWhiteSpace(tableParameters.SearchTerm))
            {
                query = query.Where(x => x.Language.StartsWith(tableParameters.SearchTerm)
                || x.MovieName.Contains(tableParameters.SearchTerm)
                || x.MovieLength.ToString().StartsWith(tableParameters.SearchTerm)
                || (x.Year.HasValue && x.Year.ToString().StartsWith(tableParameters.SearchTerm)));
            }

            var totalRecords = await query.CountAsync();

            switch (tableParameters.OrderBy)
            {
                case nameof(Movie.MovieId):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.MovieId) : query.OrderByDescending(x => x.MovieId);
                    break;
                case nameof(Movie.MovieLength):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.MovieLength) : query.OrderByDescending(x => x.MovieLength);
                    break;
                case nameof(Movie.Language):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.Language) : query.OrderByDescending(x => x.Language);
                    break;
                case nameof(Movie.Year):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.Year) : query.OrderByDescending(x => x.Year);
                    break;
                case nameof(Movie.MovieName):
                default:
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.MovieName) : query.OrderByDescending(x => x.MovieName);
                    break;
            }

            query = query.Skip(tableParameters.PageSize * (tableParameters.PageNumber - 1)).Take(tableParameters.PageSize);

            var itemResults = await query.ToListAsync();

            return new PageTableResult<Movie>
            {
                Items = itemResults,
                TotalRecords = totalRecords
            };
        }
        public async Task<Movie> GetAsync(int id)
        {
            return await _context.Movie.FindAsync(id);
        }

        public async Task<bool> InsertAsync(Movie entity)
        {
            await _context.AddAsync(entity);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int entityId)
        {
            var movie = new Movie { MovieId = entityId };
            _context.Remove(movie);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }

        public async Task<bool> ChangeAsync(Movie newMovie)
        {
            var moviedb = await GetAsync(newMovie.MovieId);

            if (moviedb == null)
                return false;

            moviedb.MovieName = newMovie.MovieName;
            moviedb.MovieLength = newMovie.MovieLength;
            moviedb.Language = newMovie.Language;
            moviedb.Year = newMovie.Year;
            moviedb.ShortDescription = newMovie.ShortDescription;
            moviedb.LongDescription = newMovie.LongDescription;
            moviedb.Trivia = newMovie.Trivia;

            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }
    }
}


