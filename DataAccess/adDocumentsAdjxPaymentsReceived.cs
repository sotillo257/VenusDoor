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
    public class adDocumentsAdjxPaymentsReceived : Connection
    {
        public List<DocumentsAdjxPaymentsReceived> GetDocumentsAdjxPaymentsReceived(int Id, int IdDocumentAdj, int IdPaymentsReceived)
        {
            List<DocumentsAdjxPaymentsReceived> adj = new List<DocumentsAdjxPaymentsReceived>();
            string sql = @"[spGetAllDocumentsAdjxPaymentsReceived] '{0}', '{1}', '{2}'";
            sql = string.Format(sql, Id, IdDocumentAdj, IdPaymentsReceived);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxPaymentsReceived", sql, _CN);
                if (ds.Tables["DocumentsAdjxPaymentsReceived"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxPaymentsReceived"].Rows)
                    {
                        adj.Add(new DocumentsAdjxPaymentsReceived()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            PaymentsReceived = new PaymentsReceived() { Id = int.Parse(item["IdPaymentsReceived"].ToString()) },
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

        public List<DocumentsAdjxPaymentsReceived> GetAllDocumentsAdjxPaymentsReceived()
        {
            List<DocumentsAdjxPaymentsReceived> adj = new List<DocumentsAdjxPaymentsReceived>();
            string sql = @"[spGetAllDocumentsAdjxPaymentsReceived]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxPaymentsReceived", sql, _CN);
                if (ds.Tables["DocumentsAdjxPaymentsReceived"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxPaymentsReceived"].Rows)
                    {
                        adj.Add(new DocumentsAdjxPaymentsReceived()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            PaymentsReceived = new PaymentsReceived() { Id = int.Parse(item["IdPaymentsReceived"].ToString()) },
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

        public int InsertDocumentsAdjxPaymentsReceived(DocumentsAdjxPaymentsReceived pDocumentsAdjxPaymentsReceived)
        {
            string sql = @"[spInsertDocumentsAdjxPaymentsReceived] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDocumentsAdjxPaymentsReceived.DocumentsAdj.Id, pDocumentsAdjxPaymentsReceived.PaymentsReceived.Id, pDocumentsAdjxPaymentsReceived.Status.Id,
                pDocumentsAdjxPaymentsReceived.CreatorUser, pDocumentsAdjxPaymentsReceived.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDocumentsAdjxPaymentsReceived(DocumentsAdjxPaymentsReceived pDocumentsAdjxPaymentsReceived)
        {
            string sql = @"[spUpdateDocumentsAdjxPaymentsReceived] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDocumentsAdjxPaymentsReceived.Id, pDocumentsAdjxPaymentsReceived.DocumentsAdj.Id, pDocumentsAdjxPaymentsReceived.PaymentsReceived.Id, pDocumentsAdjxPaymentsReceived.Status.Id,
                pDocumentsAdjxPaymentsReceived.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteDocumentsAdjxPaymentsReceived(int pId)
        {
            string sql = @"[spDeleteDocumentsAdjxPaymentsReceived] '{0}'";
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