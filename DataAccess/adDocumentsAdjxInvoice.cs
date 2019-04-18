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
    public class adDocumentsAdjxInvoice : Connection
    {
        public List<DocumentsAdjxInvoice> GetDocumentsAdjxInvoice(int IdInvoice)
        {
            List<DocumentsAdjxInvoice> adj = new List<DocumentsAdjxInvoice>();
            string sql = @"[spGetDocumentsAdjxInvoice] '{0}'";
            sql = string.Format(sql, IdInvoice);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxInvoice", sql, _CN);
                if (ds.Tables["DocumentsAdjxInvoice"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxInvoice"].Rows)
                    {
                        adj.Add(new DocumentsAdjxInvoice()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            Invoice = new Invoice() { Id = int.Parse(item["IdInvoice"].ToString()) },
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

        public List<DocumentsAdjxInvoice> GetAllDocumentsAdjxInvoice()
        {
            List<DocumentsAdjxInvoice> adj = new List<DocumentsAdjxInvoice>();
            string sql = @"[spGetAllDocumentsAdjxInvoice]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxInvoice", sql, _CN);
                if (ds.Tables["DocumentsAdjxInvoice"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxInvoice"].Rows)
                    {
                        adj.Add(new DocumentsAdjxInvoice()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            Invoice = new Invoice() { Id = int.Parse(item["IdInvoice"].ToString()) },
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

        public int InsertDocumentsAdjxInvoice(DocumentsAdjxInvoice pDocumentsAdjxInvoice)
        {
            string sql = @"[spInsertDocumentsAdjxInvoice] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDocumentsAdjxInvoice.DocumentsAdj.Id, pDocumentsAdjxInvoice.Invoice.Id, pDocumentsAdjxInvoice.Status.Id,
                pDocumentsAdjxInvoice.CreatorUser, pDocumentsAdjxInvoice.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDocumentsAdjxInvoice(DocumentsAdjxInvoice pDocumentsAdjxInvoice)
        {
            string sql = @"[spUpdateDocumentsAdjxInvoice] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDocumentsAdjxInvoice.Id, pDocumentsAdjxInvoice.DocumentsAdj.Id, pDocumentsAdjxInvoice.Invoice.Id, pDocumentsAdjxInvoice.Status.Id,
                pDocumentsAdjxInvoice.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteDocumentsAdjxInvoice(int pId)
        {
            string sql = @"[spDeleteDocumentsAdjxInvoice] '{0}'";
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