﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DoorStyle
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
        public List<InsideEdgeProfile> listInsideProfile { get; set; }
        public List<OutsideEdgeProfile> listOutsideProfile { get; set; }
    }
}
