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
    public class adDocumentsAdjxCreditNotes : Connection
    {       
        public List<DocumentsAdjxCreditNotes> GetDocumentsAdjxCreditNotes(int Id, int IdDocumentAdj, int IdCreditNotes)
        {
            List<DocumentsAdjxCreditNotes> adj = new List<DocumentsAdjxCreditNotes>();
            string sql = @"[spGetAllDocumentsAdjxCreditNotes] '{0}', '{1}', '{2}'";
            sql = string.Format(sql, Id, IdDocumentAdj, IdCreditNotes);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxCreditNotes", sql, _CN);
                if (ds.Tables["DocumentsAdjxCreditNotes"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxCreditNotes"].Rows)
                    {
                        adj.Add(new DocumentsAdjxCreditNotes()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            CreditNotes = new CreditNotes() { Id = int.Parse(item["IdCreditNotes"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return adj;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DocumentsAdjxCreditNotes> GetAllDocumentsAdjxCreditNotes()
        {
            List<DocumentsAdjxCreditNotes> adj = new List<DocumentsAdjxCreditNotes>();
            string sql = @"[spGetAllDocumentsAdjxCreditNotes]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxCreditNotes", sql, _CN);
                if (ds.Tables["DocumentsAdjxCreditNotes"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxCreditNotes"].Rows)
                    {
                        adj.Add(new DocumentsAdjxCreditNotes()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            CreditNotes = new CreditNotes() { Id = int.Parse(item["IdCreditNotes"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return adj;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDocumentsAdjxCreditNotes(DocumentsAdjxCreditNotes pDocumentsAdjxCreditNotes)
        {
            string sql = @"[spInsertDocumentsAdjxCreditNotes] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDocumentsAdjxCreditNotes.DocumentsAdj.Id, pDocumentsAdjxCreditNotes.CreditNotes.Id, pDocumentsAdjxCreditNotes.Status.Id,
                pDocumentsAdjxCreditNotes.CreatorUser, pDocumentsAdjxCreditNotes.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDocumentsAdjxCreditNotes(DocumentsAdjxCreditNotes pDocumentsAdjxCreditNotes)
        {
            string sql = @"[spUpdateDocumentsAdjxCreditNotes] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDocumentsAdjxCreditNotes.Id, pDocumentsAdjxCreditNotes.DocumentsAdj.Id, pDocumentsAdjxCreditNotes.CreditNotes.Id, pDocumentsAdjxCreditNotes.Status.Id,
                pDocumentsAdjxCreditNotes.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteDocumentsAdjxCreditNotes(int pId)
        {
            string sql = @"[spDeleteDocumentsAdjxCreditNotes] '{0}'";
            sql = string.Format(sql, pId);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }
    }
}