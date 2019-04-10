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
    public class adHistoryCreditNotes : Connection
    {
        public List<HistoryCreditNotes> GetHistoryCreditNotesByIdCreditNotes(int IdCreditsNotes)
        {
            List<HistoryCreditNotes> HistoEst = new List<HistoryCreditNotes>();
            string sql = @"[spGetHistoryCreditNotesByIdCreditNotes] '{0}' ";
            sql = string.Format(sql, IdCreditsNotes);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryCreditNotes", sql, _CN);
                if (ds.Tables["HistoryCreditNotes"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryCreditNotes"].Rows)
                    {
                        HistoEst.Add(new HistoryCreditNotes()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            CreditNotes = new CreditNotes() { Id = int.Parse(item["IdCreditsNotes"].ToString()) },
                            UserCreador = new User() { Id = int.Parse(item["IdUserCreador"].ToString()) },
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

        public List<HistoryCreditNotes> GetAllHistoryCreditNotes()
        {
            List<HistoryCreditNotes> HistoEst = new List<HistoryCreditNotes>();
            string sql = @"[spGetAllHistoryCreditNotes]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HistoryCreditNotes", sql, _CN);
                if (ds.Tables["HistoryCreditNotes"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HistoryCreditNotes"].Rows)
                    {
                        HistoEst.Add(new HistoryCreditNotes()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            CreditNotes = new CreditNotes() { Id = int.Parse(item["IdCreditsNotes"].ToString()) },
                            UserCreador = new User() { Id = int.Parse(item["IdUserCreador"].ToString()) },
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

        public int InsertHistoryCreditNotes(HistoryCreditNotes pHE)
        {
            string sql = @"[spInsertHistoryCreditNotes] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pHE.CreditNotes.Id, pHE.UserCreador.Id, pHE.Type.Id, pHE.History, pHE.CreationDate.ToString("yyyyMMdd"));
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
