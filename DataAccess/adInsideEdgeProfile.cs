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
    public class adInsideEdgeProfile : Connection
    {
        public InsideEdgeProfile GetInsideEdgeProfileById(int Id)
        {
            InsideEdgeProfile insideedge = new InsideEdgeProfile();
            string sql = @"[spGetInsideEdgeProfile] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "InsideEdgeProfile", sql, _CN);
                if (ds.Tables["InsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["InsideEdgeProfile"].Rows)
                    {
                        insideedge = new InsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return insideedge;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<InsideEdgeProfile> GetAllInsideEdgeProfile()
        {
            List<InsideEdgeProfile> insideedge = new List<InsideEdgeProfile>();
            string sql = @"[spGetAllInsideEdgeProfile]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "InsideEdgeProfile", sql, _CN);
                if (ds.Tables["InsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["InsideEdgeProfile"].Rows)
                    {
                        insideedge.Add(new InsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return insideedge;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)
        {
            string sql = @"[spInsertOutsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pInsideEdgeProfile.Description, pInsideEdgeProfile.Status.Id, pInsideEdgeProfile.CreationDate.ToString("yyyy-MM-dd"),
                pInsideEdgeProfile.CreatorUser, pInsideEdgeProfile.ModificationDate.ToString("yyyy-MM-dd"), pInsideEdgeProfile.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)
        {
            string sql = @"[spUpdateInsideEdgeProfile] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pInsideEdgeProfile.Description, pInsideEdgeProfile.Status.Id, pInsideEdgeProfile.ModificationDate.ToString("yyyy-MM-dd"),
                pInsideEdgeProfile.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Elimina InsideEdgeProfile por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteInsideEdgeProfile(int pId)
        {
            string sql = @"[spDeleteInsideEdgeProfile] '{0}'";
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
