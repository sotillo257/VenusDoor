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
    public class adBottomRail : Connection
    {
        public BottomRail GetBottomRailById(int Id)
        {
            BottomRail bottomrail = new BottomRail();
            string sql = @"[spGetBottomRail] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "BottomRail", sql, _CN);
                if (ds.Tables["BottomRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["BottomRail"].Rows)
                    {
                        bottomrail = new BottomRail()
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
                return bottomrail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<BottomRail> GetAllBottomRail()
        {
            List<BottomRail> bottomrail = new List<BottomRail>();
            string sql = @"[spGetAllBottomRail]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "BottomRail", sql, _CN);
                if (ds.Tables["BottomRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["BottomRail"].Rows)
                    {
                        bottomrail.Add(new BottomRail()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() {Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return bottomrail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertBottomRail(BottomRail pBottomRail)
        {
            string sql = @"[spInsertBottomRail] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pBottomRail.Description, pBottomRail.Status.Id,
                pBottomRail.CreatorUser, pBottomRail.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateBottomRail(BottomRail pBottomRail)
        {
            string sql = @"[spUpdateBottomRail] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql,pBottomRail.Id, pBottomRail.Description, pBottomRail.Status.Id,
                pBottomRail.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }
     
        public void DeleteBottomRail(int pId)
        {
            string sql = @"[spDeleteBottomRail] '{0}'";
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