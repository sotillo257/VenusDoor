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
    public class adCreditNotesxInvoices : Connection
    {
        public List<CreditNotesxInvoices> GetCreditNotesxInvoices(int IdCreditNotes, int IdInvoice)
        {
            List<CreditNotesxInvoices> cdn = new List<CreditNotesxInvoices>();
            string sql = @"[spGetCreditNotesxInvoices] '{0}','{1}'";
            sql = string.Format(sql, IdCreditNotes, IdInvoice);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "CreditNotesxInvoices", sql, _CN);
                if (ds.Tables["CreditNotesxInvoices"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["CreditNotesxInvoices"].Rows)
                    {
                        cdn.Add(new CreditNotesxInvoices()
                        {
                            CreditNotes = new CreditNotes() { Id = int.Parse(item["IdCreditNotes"].ToString()) },
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

        public int InsertCreditNotesxInvoices(CreditNotesxInvoices pCreditNotesxInvoices)
        {
            string sql = @"[spInsertCreditNotesxInvoices] '{0}', '{1}', '{2}'";
            sql = string.Format(sql, pCreditNotesxInvoices.CreditNotes.Id, pCreditNotesxInvoices.Invoice.Id, pCreditNotesxInvoices.Amount);
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
