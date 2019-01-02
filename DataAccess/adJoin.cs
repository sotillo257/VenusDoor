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
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Description = item["Description"].ToString(),
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
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Description = item["Description"].ToString(),
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

        public int InsertJoin(Preparation pJoin)
        {
            string sql = @"[spInsertJoin] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pJoin.Description, pJoin.IdStatus, pJoin.CreationDate.ToString("yyyyMMdd"),
                pJoin.CreatorUser, pJoin.ModificationDate.ToString("yyyyMMdd"), pJoin.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateJoin(Join pJoin)
        {
            string sql = @"[spUpdateJoin] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pJoin.Description, pJoin.IdStatus, pJoin.ModificationDate.ToString("yyyyMMdd"),
                pJoin.ModificationUser);
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
