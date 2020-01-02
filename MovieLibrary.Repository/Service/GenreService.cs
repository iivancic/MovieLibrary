using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibrary.Service
{
    public class GenreService
    {
        private readonly MovieLibraryContext _context;

        public GenreService()
        {
            _context = new MovieLibraryContext();
        }

        public Task<List<Genre>> QueryAll()
        {
            return _context.Genres.ToListAsync();
        }

        public async Task<PageTableResult<Genre>> GetTableAsync(TableParameters tableParameters)
        {
            var query = _context.Genres.AsQueryable();

            if (!string.IsNullOrWhiteSpace(tableParameters.SearchTerm))
            {
                query = query.Where(x => x.GenreName.StartsWith(tableParameters.SearchTerm));
            }

            var totalRecords = await query.CountAsync();

            switch (tableParameters.OrderBy)
            {
                case nameof(Genre.GenreId):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.GenreId) : query.OrderByDescending(x => x.GenreId);
                    break;
                case nameof(Genre.GenreName):
                default:
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.GenreName) : query.OrderByDescending(x => x.GenreName);
                    break;
            }

            query = query.Skip(tableParameters.PageSize * (tableParameters.PageNumber - 1)).Take(tableParameters.PageSize);

            var itemResults = await query.ToListAsync();

            return new PageTableResult<Genre>
            {
                Items = itemResults,
                TotalRecords = totalRecords
            };
        }
        public async Task<Genre> GetAsync(int id)
        {
            return await _context.Genres.FindAsync(id);
        }

        public async Task<bool> InsertAsync(Genre entity)
        {
            await _context.AddAsync(entity);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int entityId)
        {
            var genre = new Genre { GenreId = entityId };
            _context.Remove(genre);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }


        public async Task<bool> ChangeAsync(int entityId, string newGenreName)
        {
            var genredb = await GetAsync(entityId);

            if (genredb == null)
                return false;

            genredb.GenreName = newGenreName;

            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }
    }
}