using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Model;
using MovieLibrary.Service;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MovieLibrary.Controllers
{
    [Route("api/[controller]")]
    public class GenreController : BaseController
    {
        private readonly GenreService _service;

        public GenreController()
        {
            _service = new GenreService();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var results = await _service.QueryAll();

            return Ok(new
            {
                Items = results.Select(r => new
                {
                    r.GenreId,
                    r.GenreName
                }).OrderBy(r => r.GenreId).ToList()
            });
        }


        // GET: api/Genre/5
        [HttpGet("{entityId}", Name = "Get")]
        //[HttpGet, Route({entityId}]
        public async Task<IActionResult> DeleteAsync(int entityId)
        {
            var deleteResult = await _service.DeleteAsync(entityId);
            if (!deleteResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Genre entity)
        {
            var insertResult = await _service.InsertAsync(entity);

            if (!insertResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }


        // PUT: api/Genre/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}