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