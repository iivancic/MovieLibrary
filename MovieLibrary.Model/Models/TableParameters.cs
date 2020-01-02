using System;
using System.Collections.Generic;
using System.Text;

namespace MovieLibrary.Model
{
    public class TableParameters
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public bool OrderDirection { get; set; }
    }

}
