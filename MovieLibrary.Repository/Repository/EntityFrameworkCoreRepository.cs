using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MovieLibrary.Service
{
    public class EntityFrameworkCoreRepository<TEntity> where TEntity : class
    {
        private readonly MovieLibraryContext _context;

        public EntityFrameworkCoreRepository()
        {
            _context = new MovieLibraryContext();
        }

        public IQueryable<TEntity> QueryAll()
        {
            return _context.Set<TEntity>().AsNoTracking();
        }
    }
}