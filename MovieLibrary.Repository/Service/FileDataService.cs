using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MovieLibrary.Service
{
    public class FileDataService
    {
        private readonly MovieLibraryContext _context;

        public FileDataService()
        {
            _context = new MovieLibraryContext();
        }

        public Task<List<FileData>> QueryAll()
        {
            return _context.FileData.ToListAsync();
        }
 
    }
}
