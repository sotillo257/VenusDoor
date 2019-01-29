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
    public class adHingeDirection : Connection
    {
        public HingeDirection GetHingeDirectionById(int Id)
        {
            HingeDirection hinged = new HingeDirection();
            string sql = @"[spGetHingeDirection] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HingeDirection", sql, _CN);
                if (ds.Tables["HingeDirection"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HingeDirection"].Rows)
                    {
                        hinged = new HingeDirection()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Direction = item["Direction"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return hinged;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<HingeDirection> GetAllHingeDirection()
        {
            List<HingeDirection> hinged = new List<HingeDirection>();
            string sql = @"[spGetAllHingeDirection]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HingeDirection", sql, _CN);
                if (ds.Tables["HingeDirection"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HingeDirection"].Rows)
                    {
                        hinged.Add(new HingeDirection()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Direction = item["Direction"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return hinged;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertHingeDirection(HingeDirection pHingeDirection)
        {
            string sql = @"[spInsertHingeDirection] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pHingeDirection.Direction, pHingeDirection.Status.Id, pHingeDirection.CreationDate.ToString("yyyy-MM-dd"),
                pHingeDirection.CreatorUser, pHingeDirection.ModificationDate.ToString("yyyy-MM-dd"), pHingeDirection.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateHingeDirection(HingeDirection pHingeDirection)
        {
            string sql = @"[spUpdateHingeDirection] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pHingeDirection.Id, pHingeDirection.Direction, pHingeDirection.Status.Id, pHingeDirection.ModificationDate.ToString("yyyy-MM-dd"),
                pHingeDirection.ModificationUser);
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
        /// @Descripción: Elimina HingeDirection por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteHingeDirection(int pId)
        {
            string sql = @"[spDeleteHingeDirection] '{0}'";
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
