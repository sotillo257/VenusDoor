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
        //public string _CN = @"Data Source=.;Initial Catalog=DB_A448B1_venusdoorsDB;Integrated Security = True";  // BD LOCAL     
        public string _CN = @"Data Source=db771851006.hosting-data.io;Initial Catalog=db771851006;User Id=dbo771851006;Password=AZA24766sal*;"; //BD Dev
        //public string _CN = @"Data Source=db771851006.hosting-data.io;Initial Catalog=db771852829;User Id=dbo771852829;Password=AZA24766sal*;"; //BD App Primary
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
