﻿using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetTableAsync([FromQuery] TableParameters tableParameters)
        {
            var result = await _service.GetTableAsync(tableParameters);

            return Ok(result);
        }

        // GET: api/Genre/5
        [HttpDelete("{entityId}", Name = "Get")]
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
        public async Task<IActionResult> PutAsync(int id, [FromBody] Genre value)
        {
            var changedResult = await _service.ChangeAsync(id, value.GenreName);
            if (!changedResult)
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to insert entity.");

            return Ok();
        }
    }
}