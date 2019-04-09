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
    public class adDocumentsAdj : Connection
    {
        public DocumentsAdj GetDocumentsAdjById(int Id)
        {
            DocumentsAdj adj = new DocumentsAdj();
            string sql = @"[spGetDocumentsAdj] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdj", sql, _CN);
                if (ds.Tables["DocumentsAdj"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdj"].Rows)
                    {
                        adj = new DocumentsAdj()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["Name"].ToString(),
                            Route = item["Route"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return adj;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DocumentsAdj> GetAllDocumentsAdj()
        {
            List<DocumentsAdj> adj = new List<DocumentsAdj>();
            string sql = @"[spGetAllDocumentsAdj]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DocumentsAdj", sql, _CN);
                if (ds.Tables["DocumentsAdj"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DocumentsAdj"].Rows)
                    {
                        adj.Add(new DocumentsAdj()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["Name"].ToString(),
                            Route = item["Route"].ToString(),
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

        public int InsertDocumentsAdj(DocumentsAdj pDocumentsAdj)
        {
            string sql = @"[spInsertDocumentsAdj] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}'";
            sql = string.Format(sql, pDocumentsAdj.Name, pDocumentsAdj.Route, pDocumentsAdj.Status.Id, pDocumentsAdj.CreationDate.ToString("yyyyMMdd"),
                pDocumentsAdj.CreatorUser, pDocumentsAdj.ModificationDate.ToString("yyyyMMdd"), pDocumentsAdj.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDocumentsAdj(DocumentsAdj pDocumentsAdj)
        {
            string sql = @"[spUpdateDocumentsAdj] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pDocumentsAdj.Id, pDocumentsAdj.Name, pDocumentsAdj.Route, pDocumentsAdj.Status.Id, pDocumentsAdj.ModificationDate.ToString("yyyyMMdd"),
                pDocumentsAdj.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteDocumentsAdj(int pId)
        {
            string sql = @"[spDeleteDocumentsAdj] '{0}'";
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