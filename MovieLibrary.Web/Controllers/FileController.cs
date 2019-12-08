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
    public class FileController : Controller
    {
        [HttpGet, Route("test")]
        //public IActionResult Download()
        //{
        //    using var context = new MovieLibraryContext();
        //    var file = context
        //               .CarouselImages
        //               .Where(u => u.ImageId == 1003)
        //               .Select(u => u.CarouselImage)
        //               .SingleOrDefault();

        //    if (file == null)
        //        return NotFound();

        //    var SendFile = "data: image / jpeg; base64," + file;

        //    //return file(filestream, "image/jpeg", path.getfilename(imagepath));
        //    return Content(SendFile);
        //}

        [HttpGet, Route("download/{fileId}")]
        public IActionResult Download(int fileid)
        {
            var imagePath = @"c:\users\irena\documents\movielibrary\movielibrarydatabase\movielibrarydatabase\images\diehardposter.jpg";
            var imageBytes = System.IO.File.ReadAllBytes(imagePath);

            return File(imageBytes, "image/jpeg", Path.GetFileName(imagePath));
        }

        [HttpGet, Route("testing")]
        public IActionResult GenreGet()
        {
            using var context = new MovieLibraryContext();

            var result = context.Genres;

            var sendResults = context.Genres
                .Select(x => new { x.GenreName, x.GenreId });

            return Ok(sendResults.ToList());
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