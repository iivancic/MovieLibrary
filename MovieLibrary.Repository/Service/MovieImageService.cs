using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MovieLibrary.Service
{
    class MovieImageService
    {
        private readonly MovieLibraryContext _context;

        public MovieImageService()
        {
            _context = new MovieLibraryContext();
        }
/*
        public async Task<PageTableResult<Image>> GetTableAsync(TableParameters tableParameters)
        {
            var query = _context.MovieImages.AsQueryable();
            query = query.Include(x => x.FileInfo)
                         .ThenInclude(x => x.FileData)
                         .Include(y => y.ImageType);

            if(!string.IsNullOrWhiteSpace(tableParameters.SearchTerm))
            {
                query = query.Where(x => x.FileInfo.FileName.StartsWith(tableParameters.SearchTerm)
                    || x.FileInfo.FileExtension.StartsWith(tableParameters.SearchTerm)
                    || (x.FileInfo.Size.HasValue && x.FileInfo.Size.ToString().StartsWith(tableParameters.SearchTerm))
                    || x.ImageType.TypeName.StartsWith(tableParameters.SearchTerm));
                   
            }
        }
        */
    }
}
