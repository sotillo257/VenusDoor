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
    public class adRailWidth : Connection
    {
        public RailWidth GetRailWidthById(int Id)
        {
            RailWidth railwidth = new RailWidth();
            string sql = @"[spGetRailWidth] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "RailWidth", sql, _CN);
                if (ds.Tables["RailWidth"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["RailWidth"].Rows)
                    {
                        railwidth = new RailWidth()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return railwidth;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<RailWidth> GetAllRailWidth()
        {
            List<RailWidth> railwidth = new List<RailWidth>();
            string sql = @"[spGetAllRailWidth]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "RailWidth", sql, _CN);
                if (ds.Tables["RailWidth"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["RailWidth"].Rows)
                    {
                        railwidth.Add(new RailWidth()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return railwidth;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertRailWidth(RailWidth pRailWidth)
        {
            string sql = @"[spInsertRailWidth] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pRailWidth.Width, pRailWidth.IdStatus, pRailWidth.CreationDate.ToString("yyyyMMdd"),
                pRailWidth.CreatorUser, pRailWidth.ModificationDate.ToString("yyyyMMdd"), pRailWidth.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateRailWidth(RailWidth pRailWidth)
        {
            string sql = @"[spUpdateRailWidth] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pRailWidth.Width, pRailWidth.IdStatus, pRailWidth.ModificationDate.ToString("yyyyMMdd"),
                pRailWidth.ModificationUser);
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
        /// @Descripción: Elimina RailWidth por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteRailWidth(int pId)
        {
            string sql = @"[spDeleteRailWidth] '{0}'";
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
