using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class HingePositions
    {
        public int Id { get; set; }
        public string Position1 { get; set; }
        public string Position2 { get; set; }
        public string Position3 { get; set; }
        public string Position4 { get; set; }
        public string Position5 { get; set; }
        public Status Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
    }
}
