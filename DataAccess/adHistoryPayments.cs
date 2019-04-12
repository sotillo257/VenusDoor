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
    public class adHistoryPayments : Connection
    {
        public List<HistoryPayments> GetHistoryPaymentsByIdPayments(int IdPayments)
        {
            List<HistoryPayments> HistoEst = new List<HistoryPayments>();
            string sql = @"[spGetHistoryPaymentsByIdPayments] '{0}' ";
            sql = string.Format(sql, IdPayments);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryPayments", sql, _CN);
                if (ds.Tables["HistoryPayments"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryPayments"].Rows)
                    {
                        HistoEst.Add(new HistoryPayments()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            PaymentsReceived = new PaymentsReceived() { Id = int.Parse(item["IdPayments"].ToString()) },
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

        public List<HistoryPayments> GetAllHistoryPayments()
        {
            List<HistoryPayments> HistoEst = new List<HistoryPayments>();
            string sql = @"[spGetAllHistoryPayments]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryPayments", sql, _CN);
                if (ds.Tables["HistoryPayments"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryPayments"].Rows)
                    {
                        HistoEst.Add(new HistoryPayments()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            PaymentsReceived = new PaymentsReceived() { Id = int.Parse(item["IdPayments"].ToString()) },
                            UserCreador = new User() { Id = int.Parse(item["IdUserCreador"].ToString()) },
                            NameCreador = item["NameCreador"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()) },
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

        public int InsertHistoryPayments(HistoryPayments pHE)
        {
            string sql = @"[spInsertHistoryPayments] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pHE.PaymentsReceived.Id, pHE.UserCreador.Id, pHE.Type.Id, pHE.History);
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
