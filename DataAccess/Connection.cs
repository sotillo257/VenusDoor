﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace DataAccess
{
    public class Connection
    {
        public string _CN = @"Data Source=db771851006.hosting-data.io;Initial Catalog=db771851006;User Id=dbo771851006;Password=AZA24766sal*;"; //BD Dev    
        //public string _CN = @"Data Source=sql5032.site4now.net;Initial Catalog=DB_A4673B_venusdoorsbmt;User Id=DB_A4673B_venusdoorsbmt_admin;Password=bmt12345!;";
        //public string _CN = @"Data Source=db771852829.hosting-data.io;Initial Catalog=db771852829;User Id=dbo771852829;Password=AZA24766sal*;"; //BD App Primary                       
        //public string _CN = @"Data Source=.;Initial Catalog=DB_A448B1_venusdoorsDB;Integrated Security = True";  // BD LOCAL                 

        public MetodosDB.MetodosDB _MB = new MetodosDB.MetodosDB(); 

        public SqlConnection connection = new SqlConnection();
    }
}
