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
    public class adOutsideEdgeProfile : Connection
    {
        public OutsideEdgeProfile GetOutsideEdgeProfileById(int Id)
        {
            OutsideEdgeProfile outedge = new OutsideEdgeProfile();
            string sql = @"[spGetOutsideEdgeProfile] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "OutsideEdgeProfile", sql, _CN);
                if (ds.Tables["OutsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["OutsideEdgeProfile"].Rows)
                    {
                        outedge = new OutsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return outedge;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<OutsideEdgeProfile> GetAllOutsideEdgeProfile()
        {
            List<OutsideEdgeProfile> outedge = new List<OutsideEdgeProfile>();
            string sql = @"[spGetAllOutsideEdgeProfile]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "OutsideEdgeProfile", sql, _CN);
                if (ds.Tables["OutsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["OutsideEdgeProfile"].Rows)
                    {
                        outedge.Add(new OutsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return outedge;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfile)
        {
            string sql = @"[spInsertOutsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pOutsideEdgeProfile.Description, pOutsideEdgeProfile.IdStatus, pOutsideEdgeProfile.CreationDate.ToString("yyyyMMdd"),
                pOutsideEdgeProfile.CreatorUser, pOutsideEdgeProfile.ModificationDate.ToString("yyyyMMdd"), pOutsideEdgeProfile.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfile)
        {
            string sql = @"[spUpdateOutsideEdgeProfile] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pOutsideEdgeProfile.Description, pOutsideEdgeProfile.IdStatus, pOutsideEdgeProfile.ModificationDate.ToString("yyyyMMdd"),
                pOutsideEdgeProfile.ModificationUser);
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
        /// @Descripción: Elimina OutsideEdgeProfile por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteOutsideEdgeProfile(int pId)
        {
            string sql = @"[spDeleteOutsideEdgeProfile] '{0}'";
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
