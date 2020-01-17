using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
using System.IO;
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

        public async Task<byte[]> GetAsync(int id)
        {
            var image = await _context.FileData
                .Where(x => x.FileDataId == id)
                .Select(x => x.Data).FirstOrDefaultAsync();

            return image;
        }

        public async Task<bool> InsertAsync(string path)
        {
            var imageArray = File.ReadAllBytes(path);
            var fileData = new FileData
            {
                Data = imageArray
            };
            await _context.AddAsync(fileData);
            var affectedRows = await _context.SaveChangesAsync();
            return affectedRows > 0;
        }
    }
}
