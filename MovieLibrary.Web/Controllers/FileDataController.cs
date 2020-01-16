using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using MovieLibrary.Service;
using MovieLibrary.Model;

namespace MovieLibrary.Web
{
    [Route("file")]
    public class FileDataController : Controller
    {
        private readonly FileDataService _service;

        public FileDataController()
        {
            _service = new FileDataService();
        }

        [HttpGet, Route("download/{fileId}")]
        public IActionResult Download(int fileid)
        {
            var imagePath = @"c:\users\irena\documents\movielibrary\movielibrarydatabase\movielibrarydatabase\images\diehardposter.jpg";
            var imageBytes = System.IO.File.ReadAllBytes(imagePath);

            return File(imageBytes, "image/jpeg", Path.GetFileName(imagePath));
        }

  
        /*[HttpPost, Route("")]
        public void newGenre([FromBody] string value)
        {
            using var context = new MovieLibraryContext();

            var genre = new Genre
            {
                GenreName = value
            };

            context.Genres.Add(genre);
            context.SaveChanges();

        }
        */
    }
}