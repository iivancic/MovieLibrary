using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Model;
using MovieLibrary.Service;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MovieLibrary.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : BaseController
    {
        private readonly MovieService _service;

        public MoviesController()
        {
            _service = new MovieService();
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<IActionResult> GetTableAsync([FromQuery] TableParameters tableParameters)
        {
            var result = await _service.GetTableAsync(tableParameters);

            return Ok(result);
        }

        // GET: api/Movies/5
        [HttpDelete("{entityId}", Name = "GetMovies")]
        //[HttpGet, Route({entityId}]
        public async Task<IActionResult> DeleteAsync(int entityId)
        {
            var deleteResult = await _service.DeleteAsync(entityId);
            if (!deleteResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to delete entity.");

            return Ok();
        }

        // POST: api/Movies
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Movie entity)
        {
            var insertResult = await _service.InsertAsync(entity);

            if (!insertResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] Movie value)
        {
            var changedResult = await _service.ChangeAsync(value);
            if (!changedResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }

    }
}
