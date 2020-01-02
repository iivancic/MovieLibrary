using System;
using System.Collections.Generic;
using System.Text;

namespace MovieLibrary.Model
{
    public class PageTableResult<T> where T : class
    {
        public List<T> Items { get; set; }
        public int TotalRecords { get; set; }
    }
}
