using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLibrary.Service
{
    public class FileInfoService
    {
        private readonly MovieLibraryContext _context;

        public FileInfoService(MovieLibraryContext context)
        {
            _context = context;
        }

        public Task<List<FileInfo>> QueryAll()
        {
            return _context.FileInfo.ToListAsync();
        }

        public async Task<PageTableResult<InfoData>> GetTableAsync(TableParameters tableParameters)
        {
            var query = _context.FileInfo.AsQueryable();
            query = query.Include(x => x.FileData);

            if (!string.IsNullOrWhiteSpace(tableParameters.SearchTerm))
            {
                query = query.Where(x => x.FileName.StartsWith(tableParameters.SearchTerm)
                || x.Extension.StartsWith(tableParameters.SearchTerm)
                || x.FileInfoId.ToString().StartsWith(tableParameters.SearchTerm)
                || x.Size.ToString().StartsWith(tableParameters.SearchTerm));
            }

            var totalRecords = await query.CountAsync();

            switch (tableParameters.OrderBy)
            {
                case nameof(FileInfo.FileInfoId):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.FileInfoId) : query.OrderByDescending(x => x.FileInfoId);
                    break;
                case nameof(FileInfo.FileDataId):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.FileDataId) : query.OrderByDescending(x => x.FileDataId);
                    break;
                case nameof(FileInfo.Extension):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.Extension) : query.OrderByDescending(x => x.Extension);
                    break;
                case nameof(FileInfo.Size):
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.Size) : query.OrderByDescending(x => x.Size);
                    break;
                case nameof(FileInfo.FileName):
                default:
                    query = tableParameters.OrderDirection ? query.OrderBy(x => x.FileName) : query.OrderByDescending(x => x.FileName);
                    break;
            }

            query = query.Skip(tableParameters.PageSize * (tableParameters.PageNumber - 1)).Take(tableParameters.PageSize);

            var itemResults = await query.ToListAsync();

            var mappedResults = itemResults.Select(item => new InfoData
            {
                FileInfoId = item.FileInfoId,
                FileDataId = item.FileDataId,
                Extension = item.Extension,
                Size = item.Size,
                FileName = item.FileName

            }).ToList();
            return new PageTableResult<InfoData>
            {
                Items = mappedResults,
                TotalRecords = totalRecords
            };
        }
        public async Task<FileInfo> GetAsync(int id)
        {
            return await _context.FileInfo.FindAsync(id);
        }

        public async Task<bool> InsertAsync(FileInfo entity)
        {
            await _context.AddAsync(entity);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int entityId)
        {
            var fileInfo = new FileInfo { FileInfoId = entityId };
            _context.Remove(fileInfo);
            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }


        public async Task<bool> ChangeAsync(FileInfo newfileInfo)
        {
            var fileInfodb = await GetAsync(newfileInfo.FileInfoId);

            if (fileInfodb == null)
                return false;

            fileInfodb.FileInfoId = newfileInfo.FileInfoId;
            fileInfodb.FileDataId = newfileInfo.FileDataId;
            fileInfodb.FileName = newfileInfo.FileName;
            fileInfodb.Extension = newfileInfo.Extension;
            fileInfodb.Size = newfileInfo.Size;

            var affectedRows = await _context.SaveChangesAsync();

            return affectedRows > 0;
        }
    }
}
