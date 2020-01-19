using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Model;
using MovieLibrary.Service;
using System.Net;
using System.Threading.Tasks;

namespace MovieLibrary.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : BaseController
    {
        private readonly MovieService _service;

        public MoviesController(MovieService service)
        {
            _service = service ;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<IActionResult> GetTableAsync([FromQuery] TableParameters tableParameters)
        {
            var result = await _service.GetTableAsync(tableParameters);

            return Ok(result);
        }

        [HttpGet("{entityId}", Name = "GetMovieById")]
        //[HttpGet, Route({entityId}]
        public async Task<IActionResult> GetAsync(int entityId)
        {
            var result = await _service.GetAsync(entityId);
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
        public async Task<IActionResult> PostAsync(MovieModel entity)
        {
            var insertResult = await _service.InsertAsync(entity);

            if (!insertResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] MovieModel value)
        {
            var changedResult = await _service.ChangeAsync(value);
            if (!changedResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }

    }
}
