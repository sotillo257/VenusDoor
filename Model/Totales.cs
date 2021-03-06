﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Totales
    {
        public decimal Enero { get; set; }
        public decimal Febrero { get; set; }
        public decimal Marzo { get; set; }
        public decimal Abril { get; set; }
        public decimal Mayo { get; set; }
        public decimal Junio { get; set; }
        public decimal Julio { get; set; }
        public decimal Agosto { get; set; }
        public decimal Septiembre { get; set; }
        public decimal Octubre { get; set; }
        public decimal Noviembre { get; set; }
        public decimal Diciembre { get; set; }
        public decimal TotalHistorico { get; set; }
        public decimal TotalMes { get; set; }
        public decimal TotalMesAnterior { get; set; }


    }

    public class TotalesDoors
    {
        public int DoorPending { get; set; }
        public int DoorApprove { get; set; }
        public int DoorInProcess { get; set; }
        public int DoorCompleted { get; set; }
        public int Active { get; set; }
        public int Pending { get; set; }
        public int Approve { get; set; }
        public int InProcess { get; set; }
        public int Completed { get; set; }
    }
}
