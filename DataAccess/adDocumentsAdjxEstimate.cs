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
    public class adDocumentsAdjxEstimate : Connection
    {
        public List<DocumentsAdjxEstimate> GetDocumentsAdjxEstimate(int Id, int IdDocumentAdj, int IdEstimate)
        {
            List<DocumentsAdjxEstimate> adj = new List<DocumentsAdjxEstimate>();
            string sql = @"[spGetAllDocumentsAdjxEstimate] '{0}', '{1}', '{2}'";
            sql = string.Format(sql, Id, IdDocumentAdj, IdEstimate);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxEstimate", sql, _CN);
                if (ds.Tables["DocumentsAdjxEstimate"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxEstimate"].Rows)
                    {
                        adj.Add(new DocumentsAdjxEstimate()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            Estimate = new Estimate() { Id = int.Parse(item["IdEstimate"].ToString()) },
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

        public List<DocumentsAdjxEstimate> GetAllDocumentsAdjxEstimate()
        {
            List<DocumentsAdjxEstimate> adj = new List<DocumentsAdjxEstimate>();
            string sql = @"[spGetAllDocumentsAdjxEstimate]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdjxEstimate", sql, _CN);
                if (ds.Tables["DocumentsAdjxEstimate"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdjxEstimate"].Rows)
                    {
                        adj.Add(new DocumentsAdjxEstimate()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DocumentsAdj = new DocumentsAdj() { Id = int.Parse(item["IdDocumentsAdj"].ToString()) },
                            Estimate = new Estimate() { Id = int.Parse(item["IdEstimate"].ToString()) },
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

        public int InsertDocumentsAdjxEstimate(DocumentsAdjxEstimate pDocumentsAdjxEstimate)
        {
            string sql = @"[spInsertDocumentsAdjxEstimate] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}'";
            sql = string.Format(sql, pDocumentsAdjxEstimate.DocumentsAdj.Id, pDocumentsAdjxEstimate.Estimate.Id, pDocumentsAdjxEstimate.Status.Id, pDocumentsAdjxEstimate.CreationDate.ToString("yyyyMMdd"),
                pDocumentsAdjxEstimate.CreatorUser, pDocumentsAdjxEstimate.ModificationDate.ToString("yyyyMMdd"), pDocumentsAdjxEstimate.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDocumentsAdjxEstimate(DocumentsAdjxEstimate pDocumentsAdjxEstimate)
        {
            string sql = @"[spUpdateDocumentsAdjxEstimate] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pDocumentsAdjxEstimate.Id, pDocumentsAdjxEstimate.DocumentsAdj.Id, pDocumentsAdjxEstimate.Estimate.Id, pDocumentsAdjxEstimate.Status.Id, pDocumentsAdjxEstimate.ModificationDate.ToString("yyyyMMdd"),
                pDocumentsAdjxEstimate.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteDocumentsAdjxEstimate(int pId)
        {
            string sql = @"[spDeleteDocumentsAdjxEstimate] '{0}'";
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