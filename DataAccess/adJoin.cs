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
    public class adJoin : Connection
    {
        public Join GetJoinById(int Id)
        {
            Join join = new Join();
            string sql = @"[spGetJoin] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Join", sql, _CN);
                if (ds.Tables["Join"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Join"].Rows)
                    {
                        join = new Join()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return join;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Join> GetAllJoin()
        {
            List<Join> join = new List<Join>();
            string sql = @"[spGetAllJoin]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Join", sql, _CN);
                if (ds.Tables["Join"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Join"].Rows)
                    {
                        join.Add(new Join()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return join;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertJoin(Join pjo)
        {
            string sql = @"[spInsertJoin] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pjo.Description, pjo.Status.Id, pjo.CreationDate.ToString("yyyy-MM-dd"),
                pjo.CreatorUser, pjo.ModificationDate.ToString("yyyy-MM-dd"), pjo.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateJoin(Join pjo)
        {
            string sql = @"[spUpdateJoin] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pjo.Id, pjo.Description, pjo.Status.Id, pjo.ModificationDate.ToString("yyyy-MM-dd"),
                pjo.ModificationUser);
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
        /// @Descripción: Elimina Join por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteJoin(int pId)
        {
            string sql = @"[spDeleteJoin] '{0}'";
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
