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
    public class adTopRailxJoin : Connection
    {
        public TopRailxJoin GetTopRailxJoinById(int Id)
        {
            TopRailxJoin topjoin = new TopRailxJoin();
            string sql = @"[spGetTopRailxJoin] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRailxJoin", sql, _CN);
                if (ds.Tables["TopRailxJoin"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRailxJoin"].Rows)
                    {
                        topjoin = new TopRailxJoin()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return topjoin;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<TopRailxJoin> GetAllTopRailxJoin()
        {
            List<TopRailxJoin> topjoin = new List<TopRailxJoin>();
            string sql = @"[spGetAllTopRailxJoin]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRailxJoin", sql, _CN);
                if (ds.Tables["TopRailxJoin"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRailxJoin"].Rows)
                    {
                        topjoin.Add(new TopRailxJoin()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return topjoin;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertTopRailxJoin(TopRailxJoin pTop)
        {
            string sql = @"[spInsertTopRailxJoin] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pTop.TopRail.Id, pTop.Join.Id, pTop.Status.Id,
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

        public void UpdateTopRailxJoin(TopRailxJoin pTop)
        {
            string sql = @"[spUpdateTopRailxJoin] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pTop.Id, pTop.TopRail.Id, pTop.Join.Id, pTop.Status.Id,
                pTop.ModificationUser);ssSS
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
        /// @Descripción: Elimina TopRailxJoin por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteTopRailxJoin(int pId)
        {
            string sql = @"[spDeleteTopRailxJoin] '{0}'";
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
