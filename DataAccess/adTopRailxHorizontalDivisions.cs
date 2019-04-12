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
    public class adTopRailxHorizontalDivisions : Connection
    {
        public TopRailxHorizontalDivisions GetTopRailxHorizontalDivisionsById(int Id)
        {
            TopRailxHorizontalDivisions topdiv = new TopRailxHorizontalDivisions();
            string sql = @"[spGetTopRailxHorizontalDivisions] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRailxHorizontalDivisions", sql, _CN);
                if (ds.Tables["TopRailxHorizontalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRailxHorizontalDivisions"].Rows)
                    {
                        topdiv = new TopRailxHorizontalDivisions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdTopRail"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return topdiv;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<TopRailxHorizontalDivisions> GetAllTopRailxHorizontalDivisions()
        {
            List<TopRailxHorizontalDivisions> topdiv = new List<TopRailxHorizontalDivisions>();
            string sql = @"[spGetAllTopRailxHorizontalDivisions]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRailxHorizontalDivisions", sql, _CN);
                if (ds.Tables["TopRailxHorizontalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRailxHorizontalDivisions"].Rows)
                    {
                        topdiv.Add(new TopRailxHorizontalDivisions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdTopRail"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return topdiv;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTop)
        {
            string sql = @"[spInsertTopRailxHorizontalDivisions] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pTop.TopRail.Id, pTop.HorizontalDivisions.Id, pTop.Status.Id,
                pTop.CreatorUser, pTop.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTop)
        {
            string sql = @"[spUpdateTopRailxHorizontalDivisions] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pTop.Id, pTop.TopRail.Id, pTop.HorizontalDivisions.Id, pTop.Status.Id,
                pTop.ModificationUser);
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
        /// @Descripción: Elimina TopRailxHorizontalDivisions por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteTopRailxHorizontalDivisions(int pId)
        {
            string sql = @"[spDeleteTopRailxHorizontalDivisions] '{0}'";
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
