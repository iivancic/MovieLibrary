using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Model;
using MovieLibrary.Service;
using System.Net;
using System.Threading.Tasks;

namespace MovieLibrary.Controllers
{
    [Route("api/[controller]")]
    public class FileInfoController : BaseController
    {
        private readonly FileInfoService _service;

        public FileInfoController(FileInfoService service)
        {
            _service = service;
        }

        // GET: api/FileInfo
        [HttpGet]
        public async Task<IActionResult> GetTableAsync([FromQuery] TableParameters tableParameters)
        {
            var result = await _service.GetTableAsync(tableParameters);

            return Ok(result);
        }

        // GET: api/Movies/5
        [HttpDelete("{entityId}", Name = "GetFileInfo")]
        //[HttpGet, Route({entityId}]
        public async Task<IActionResult> DeleteAsync(int entityId)
        {
            var deleteResult = await _service.DeleteAsync(entityId);
            if (!deleteResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to delete entity.");

            return Ok();
        }

        // POST: api/FileInfo
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] FileInfo entity)
        {
            var insertResult = await _service.InsertAsync(entity);

            if (!insertResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }

        // PUT: api/FileInfo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] FileInfo value)
        {
            var changedResult = await _service.ChangeAsync(value);
            if (!changedResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }
    }
}
