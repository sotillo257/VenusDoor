﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class HistoryEstimate
    {
        public int Id { get; set; }
        public Estimate Estimation { get; set; }
        public User UserCreador { get; set; }
        public string NameCreador { get; set; }
        public Type Type { get; set; }
        public string History { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
