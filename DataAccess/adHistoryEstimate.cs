using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using System.Data.SqlClient;
using System.Data;

namespace DataAccess
{
    public class adHistoryEstimate : Connection
    {
        public List<HistoryEstimate> GetHistoryEstimateByIdEstimation(int IdEstimation)
        {
            List<HistoryEstimate> HistoEst = new List<HistoryEstimate>();
            string sql = @"[spGetHistoryEstimateByIdEstimation] '{0}' ";
            sql = string.Format(sql, IdEstimation);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryEstimate", sql, _CN);
                if (ds.Tables["HistoryEstimate"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryEstimate"].Rows)
                    {
                        HistoEst.Add(new HistoryEstimate()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Estimation = new Estimate() { Id = int.Parse(item["IdEstimation"].ToString()) },
                            UserCreador = new User() { Id = int.Parse(item["IdUserCreador"].ToString()) },
                            NameCreador = item["NameCreador"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            History = item["History"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),

                        });
                    }
                }
                return HistoEst;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<HistoryEstimate> GetAllHistoryEstimate()
        {
            List<HistoryEstimate> HistoEst = new List<HistoryEstimate>();
            string sql = @"[spGetAllHistoryEstimate]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryEstimate", sql, _CN);
                if (ds.Tables["HistoryEstimate"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryEstimate"].Rows)
                    {
                        HistoEst.Add(new HistoryEstimate()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Estimation = new Estimate() { Id = int.Parse(item["IdEstimation"].ToString()) },
                            UserCreador = new User() { Id = int.Parse(item["IdUserCreador"].ToString()) },
                            NameCreador = item["NameCreador"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString() },
                            History = item["History"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),

                        });
                    }
                }
                return HistoEst;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertHistoryEstimate(HistoryEstimate pHE)
        {
            string sql = @"[spInsertHistoryEstimate] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pHE.Estimation.Id, pHE.UserCreador.Id, pHE.Type.Id, pHE.History, pHE.CreationDate.ToString("yyyyMMdd"));
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }       
    }
}
