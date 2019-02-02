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
    public class adVerticalDivisions : Connection
    {
        public VerticalDivisions GetVerticalDivisionsById(int Id)
        {
            VerticalDivisions vertdiv = new VerticalDivisions();
            string sql = @"[spGetVerticalDivisions] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "VerticalDivisions", sql, _CN);
                if (ds.Tables["VerticalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["VerticalDivisions"].Rows)
                    {
                        vertdiv = new VerticalDivisions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return vertdiv;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<VerticalDivisions> GetAllVerticalDivisions()
        {
            List<VerticalDivisions> vertdiv = new List<VerticalDivisions>();
            string sql = @"[spGetAllVerticalDivisions]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "VerticalDivisions", sql, _CN);
                if (ds.Tables["VerticalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["VerticalDivisions"].Rows)
                    {
                        vertdiv.Add(new VerticalDivisions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return vertdiv;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertVerticalDivisions(VerticalDivisions pVerticalDivisions)
        {
            string sql = @"[spInsertVerticalDivisions] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pVerticalDivisions.Quantity, pVerticalDivisions.Status.Id, pVerticalDivisions.CreationDate.ToString("yyyy-MM-dd"),
                pVerticalDivisions.CreatorUser, pVerticalDivisions.ModificationDate.ToString("yyyy-MM-dd"), pVerticalDivisions.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateVerticalDivisions(VerticalDivisions pVerticalDivisions)
        {
            string sql = @"[spUpdateInsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pVerticalDivisions.Id, pVerticalDivisions.Quantity, pVerticalDivisions.Status.Id, pVerticalDivisions.ModificationDate.ToString("yyyy-MM-dd"),
                pVerticalDivisions.ModificationUser);
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
        /// @Descripción: Elimina VerticalDivisions por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteVerticalDivisions(int pId)
        {
            string sql = @"[spDeleteVerticalDivisions] '{0}'";
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
