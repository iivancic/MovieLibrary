using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Service;
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
        public async Task<IActionResult> Get()
        {
            var results = await _service.QueryAll();

            return Ok(new
            {
                Items = results
            });
        }

        // GET: api/Genre/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Genre
        [HttpPost]
        public void Post([FromBody] string value)
        {
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