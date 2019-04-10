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
    public class adPaymentsxInvoices : Connection
    {
        public List<PaymentsxInvoices> GetPaymentsxInvoices(int IdPaymentsReceived, int IdInvoice)
        {
            List<PaymentsxInvoices> cdn = new List<PaymentsxInvoices>();
            string sql = @"[spGetPaymentsxInvoices] '{0}','{1}'";
            sql = string.Format(sql, IdPaymentsReceived, IdInvoice);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "PaymentsxInvoices", sql, _CN);
                if (ds.Tables["PaymentsxInvoices"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["PaymentsxInvoices"].Rows)
                    {
                        cdn.Add(new PaymentsxInvoices()
                        {
                            PaymentsReceived = new PaymentsReceived() { Id = int.Parse(item["IdPaymentsReceived"].ToString()) },
                            Invoice = new Invoice() { Id = int.Parse(item["IdInvoice"].ToString()) },
                            Amount = decimal.Parse(item["Amount"].ToString()),
                        });
                    }
                }
                return cdn;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int InsertPaymentsxInvoices(PaymentsxInvoices pPaymentsxInvoices)
        {
            string sql = @"[spInsertPaymentsxInvoices] '{0}', '{1}', '{2}'";
            sql = string.Format(sql, pPaymentsxInvoices.PaymentsReceived.Id, pPaymentsxInvoices.Invoice.Id, pPaymentsxInvoices.Amount);
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
