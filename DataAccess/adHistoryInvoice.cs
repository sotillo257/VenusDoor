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
    public class adHistoryInvoice : Connection
    {
        public List<HistoryInvoice> GetHistoryInvoiceByIdInvoice(int IdInvoice)
        {
            List<HistoryInvoice> HistoEst = new List<HistoryInvoice>();
            string sql = @"[spGetHistoryInvoiceByIdInvoice] '{0}' ";
            sql = string.Format(sql, IdInvoice);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryInvoice", sql, _CN);
                if (ds.Tables["HistoryInvoice"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryInvoice"].Rows)
                    {
                        HistoEst.Add(new HistoryInvoice()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Invoice = new Invoice() { Id = int.Parse(item["IdInvoice"].ToString()) },
                            UserCreador = new User() { Id = int.Parse(item["IdUserCreador"].ToString()) },
                            NameCreador = item["NameCreador"].ToString(),
                            Type = new Model.Type() { Id = int.Parse(item["IdType"].ToString()), Description = item["DescripType"].ToString()},
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

        public List<HistoryInvoice> GetAllHistoryInvoice()
        {
            List<HistoryInvoice> HistoEst = new List<HistoryInvoice>();
            string sql = @"[spGetAllHistoryInvoice]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryInvoice", sql, _CN);
                if (ds.Tables["HistoryInvoice"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryInvoice"].Rows)
                    {
                        HistoEst.Add(new HistoryInvoice()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Invoice = new Invoice() { Id = int.Parse(item["IdInvoice"].ToString()) },
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

        public int InsertHistoryInvoice(HistoryInvoice pHE)
        {
            string sql = @"[spInsertHistoryInvoice] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pHE.Invoice.Id, pHE.UserCreador.Id, pHE.Type.Id, pHE.History);
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
