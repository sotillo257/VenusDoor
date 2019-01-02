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
    public class adTopRail : Connection
    {
        public TopRail GetTopRailById(int Id)
        {
            TopRail toprail = new TopRail();
            string sql = @"[spGetTopRail] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRail", sql, _CN);
                if (ds.Tables["TopRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRail"].Rows)
                    {
                        toprail = new TopRail()
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
                return toprail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<TopRail> GetAllTopRail()
        {
            List<TopRail> toprail = new List<TopRail>();
            string sql = @"[spGetAllTopRail]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TopRail", sql, _CN);
                if (ds.Tables["TopRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TopRail"].Rows)
                    {
                        toprail.Add(new TopRail()
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
                return toprail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertTopRail(TopRail pTopRail)
        {
            string sql = @"[spInsertTopRail] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pTopRail.Description, pTopRail.IdStatus, pTopRail.CreationDate.ToString("yyyyMMdd"),
                pTopRail.CreatorUser, pTopRail.ModificationDate.ToString("yyyyMMdd"), pTopRail.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateTopRail(TopRail pTopRail)
        {
            string sql = @"[spUpdateTopRail] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pTopRail.Description, pTopRail.IdStatus, pTopRail.ModificationDate.ToString("yyyyMMdd"),
                pTopRail.ModificationUser);
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
