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

        public async Task<PageTableResult<MovieModel>> GetTableAsync(TableParameters tableParameters)
        {
            var query = _context.Movie.AsQueryable();
            query = query.Include(x => x.MovieGenres);

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

            var mappedResults = itemResults.Select(item => new MovieModel(item)).ToList();

            return new PageTableResult<MovieModel>
            {
                Items = mappedResults,
                TotalRecords = totalRecords
            };
        }
        public async Task<MovieModel> GetAsync(int id)
        {
            var movie = await _context.Movie
                .Where(x => x.MovieId == id)
                .Include(x => x.MovieGenres)
                .Select(x => new MovieModel(x))
                .FirstOrDefaultAsync();

            return movie;
        }

        public async Task<bool> InsertAsync(MovieModel entity)
        {
            var movieDb = entity.ToEntity();
            await _context.AddAsync(movieDb);
            int affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int entityId)
        {
            var movie = new Movie { MovieId = entityId };
            _context.Remove(movie);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }

        public async Task<bool> ChangeAsync(MovieModel newMovie)
        {
            var moviedb = await _context.Movie.Include(x => x.MovieGenres)
                .FirstOrDefaultAsync(x => x.MovieId == newMovie.MovieId);

            if (moviedb == null)
                return false;

            moviedb.MovieName = newMovie.MovieName;
            moviedb.MovieLength = newMovie.MovieLength;
            moviedb.Language = newMovie.Language;
            moviedb.Year = newMovie.Year;
            moviedb.ShortDescription = newMovie.ShortDescription;
            moviedb.LongDescription = newMovie.LongDescription;
            moviedb.Trivia = newMovie.Trivia;
            moviedb.MovieGenres = newMovie.Genres.Select(x => new MovieGenre { GenreId = x }).ToList();

            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }
    }
}


