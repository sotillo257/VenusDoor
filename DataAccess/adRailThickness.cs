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
    public class adRailThickness : Connection
    {
        public RailThickness GetRailThicknessById(int Id)
        {
            RailThickness RT = new RailThickness();
            string sql = @"[spGetRailThickness] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "RailThickness", sql, _CN);
                if (ds.Tables["RailThickness"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["RailThickness"].Rows)
                    {
                        RT = new RailThickness()
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
                return RT;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<RailThickness> GetAllRailThickness()
        {
            List<RailThickness> RT = new List<RailThickness>();
            string sql = @"[spGetAllRailThickness]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "RailThickness", sql, _CN);
                if (ds.Tables["RailThickness"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["RailThickness"].Rows)
                    {
                        RT.Add(new RailThickness()
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
                return RT;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertRailThickness(RailThickness pRailThickness)
        {
            string sql = @"[spInsertRailThickness] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pRailThickness.Description, pRailThickness.Status.Id, pRailThickness.CreationDate.ToString("yyyyMMdd"),
                pRailThickness.CreatorUser, pRailThickness.ModificationDate.ToString("yyyyMMdd"), pRailThickness.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateRailThickness(RailThickness pRailThickness)
        {
            string sql = @"[spUpdateRailThickness] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pRailThickness.Id, pRailThickness.Description, pRailThickness.Status.Id, pRailThickness.ModificationDate.ToString("yyyyMMdd"),
                pRailThickness.ModificationUser);
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
        /// @Descripción: Elimina BottomRail por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteRailThickness(int pId)
        {
            string sql = @"[spRailThickness] '{0}'";
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
