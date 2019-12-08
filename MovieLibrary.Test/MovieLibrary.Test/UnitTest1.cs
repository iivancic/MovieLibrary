using MovieLibBack;
using System;
using System.Threading.Tasks;
using Xunit;
using MovieLibBack.Controllers;

namespace MovieLibrary.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            var service = new MovieService();
            var test = service.Query();
            service.ImageToDb(@"C:\Users\irena\Documents\MovieLibrary\MovieLibraryDatabase\MovieLibraryDatabase\Images\DieHardPoster.jpg");
        }
    }
}