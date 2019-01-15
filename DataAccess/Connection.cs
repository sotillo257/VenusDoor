using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace DataAccess
{
    public class Connection
    {
        public string _CN = @"Data Source=sql5028.site4now.net;Initial Catalog=DB_A448B1_venusdoorsDB;User Id=DB_A448B1_venusdoorsDB_admin;Password=venussage123;";
        //public string _CN = @"Data Source=DESKTOP-SBHC8RP;Initial Catalog=sage; Integrated Security = True ";        
        //public string _CN = @"Data Source=DESKTOP-H9K1VSL\MSSQLSERVER2014;Initial Catalog=BioKontrol;Persist Security Info=True;User ID=sa;Password=123456;";
        //public string _CN = @"Data Source=BioKontrol.mssql.somee.com;Initial Catalog=BioKontrol;Persist Security Info=True;User ID=gihvogom_SQLLogin_1;Password=8jexmsu4e8;";
        public MetodosDB.MetodosDB _MB = new MetodosDB.MetodosDB();

        public SqlConnection connection = new SqlConnection();

        public SqlConnection GetConnection()
        {
            connection = new SqlConnection("server=DESKTOP-SBHC8RP ; database=sage ; integrated security = true");
            try
            {
                connection.Open();
                return connection;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DownloadConnection()
        {
            connection.Dispose();
            return true;
        }
       
          
       

    }

}
