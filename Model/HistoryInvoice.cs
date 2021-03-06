﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class HistoryInvoice
    {
        public int Id { get; set; }
        public Invoice Invoice { get; set; }
        public User UserCreador { get; set; }
        public string NameCreador { get; set; }
        public Type Type { get; set; }
        public string History { get; set; }
        public DateTime CreationDate { get; set; }        
    }
}
