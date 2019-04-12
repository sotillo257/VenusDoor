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
    public class adHorizontalDivisions : Connection
    {
        public HorizontalDivisions GetHorizontalDivisionsById(int Id)
        {
            HorizontalDivisions hordiv = new HorizontalDivisions();
            string sql = @"[spGetHorizontalDivisions] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HorizontalDivisions", sql, _CN);
                if (ds.Tables["HorizontalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HorizontalDivisions"].Rows)
                    {
                        hordiv = new HorizontalDivisions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return hordiv;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<HorizontalDivisions> GetAllHorizontalDivisions()
        {
            List<HorizontalDivisions> hordiv = new List<HorizontalDivisions>();
            string sql = @"[spGetAllHorizontalDivisions]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HorizontalDivisions", sql, _CN);
                if (ds.Tables["HorizontalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HorizontalDivisions"].Rows)
                    {
                        hordiv.Add(new HorizontalDivisions()
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
                return hordiv;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)
        {
            string sql = @"[spInsertHorizontalDivisions] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pHorizontalDivisions.Quantity, pHorizontalDivisions.Status.Id,
                pHorizontalDivisions.CreatorUser, pHorizontalDivisions.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)
        {
            string sql = @"[spUpdateHorizontalDivisions] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pHorizontalDivisions.Id, pHorizontalDivisions.Quantity, pHorizontalDivisions.Status.Id,
                pHorizontalDivisions.ModificationUser);
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
        /// @Descripción: Elimina HorizontalDivisions por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteHorizontalDivisions(int pId)
        {
            string sql = @"[spDeleteHorizontalDivisions] '{0}'";
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
