using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Model;
using MovieLibrary.Service;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MovieLibrary.Controllers
{
    [Route("api/[controller]")]
    public class FileDataController : BaseController
    {
        private readonly FileDataService _service;

        public FileDataController(FileDataService service)
        {
            _service = service;
        }

        [HttpGet, Route("getImage/{fileId}")]
        public async Task<IActionResult> GetImageAsync(int fileId)
        {
            var result = await _service.GetAsync(fileId);
            return File(result, "image/png");
        }

        [HttpPost, Route("source")]
        public async Task<IActionResult> PostAsync([FromBody] FilePathParams parameters)
        {
            if (parameters == null || String.IsNullOrWhiteSpace(parameters.Source))
                return BadRequest("Source must be specified!");

            var insertResult = await _service.InsertAsync(parameters.Source);
            if (!insertResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");
            return Ok();
        }

        public class FilePathParams
        {
            public string Source { get; set; }
        }
    }
}