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
    public class adTopRailxVerticalDivisions : Connection
    {
        public TopRailxVerticalDivisions GetTopRailxVerticalDivisionsById(int Id)
        {
            TopRailxVerticalDivisions topdiv = new TopRailxVerticalDivisions();
            string sql = @"[spGetTopRailxVerticalDivisions] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRailxVerticalDivisions", sql, _CN);
                if (ds.Tables["TopRailxVerticalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRailxVerticalDivisions"].Rows)
                    {
                        topdiv = new TopRailxVerticalDivisions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["Description"].ToString() },
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

        public List<TopRailxVerticalDivisions> GetAllTopRailxVerticalDivisions()
        {
            List<TopRailxVerticalDivisions> topdiv = new List<TopRailxVerticalDivisions>();
            string sql = @"[spGetAllTopRailxVerticalDivisions]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRailxVerticalDivisions", sql, _CN);
                if (ds.Tables["TopRailxVerticalDivisions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRailxVerticalDivisions"].Rows)
                    {
                        topdiv.Add(new TopRailxVerticalDivisions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["Description"].ToString() },
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

        public int InsertTopRailxVerticalDivisions(TopRailxVerticalDivisions pTop)
        {
            string sql = @"[spInsertTopRailxVerticalDivisions] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}','{6}'";
            sql = string.Format(sql, pTop.TopRail.Id, pTop.VerticalDivisions.Id, pTop.Status.Id, pTop.CreationDate.ToString("yyyy-MM-dd"),
                pTop.CreatorUser, pTop.ModificationDate.ToString("yyyy-MM-dd"), pTop.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateTopRailxVerticalDivisions(TopRailxVerticalDivisions pTop)
        {
            string sql = @"[spUpdateTopRailxVerticalDivisions] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pTop.TopRail.Id, pTop.VerticalDivisions.Id, pTop.Status.Id, pTop.ModificationDate.ToString("yyyy-MM-dd"),
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
        /// @Descripción: Elimina TopRailxVerticalDivisions por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteTopRailxVerticalDivisions(int pId)
        {
            string sql = @"[spDeleteTopRailxVerticalDivisions] '{0}'";
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
