﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Status
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Group Group { get; set; }
    }
}
