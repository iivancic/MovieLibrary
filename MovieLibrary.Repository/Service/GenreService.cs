using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
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

        public async Task<bool> InsertAsync(Genre entity)
        {
            await _context.AddAsync(entity);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }
    }
}