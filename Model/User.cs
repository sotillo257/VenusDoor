using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Type Type { get; set; }
        public Person Person { get; set; }
        public Status Status { get; set; }
        public string VerificationCode { get; set; }
        public DateTime CreationDate { get; set; }
        public int CreatorUser { get; set; }
        public DateTime ModificationDate { get; set; }
        public int ModificationUser { get; set; }
    }
}
