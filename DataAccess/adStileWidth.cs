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
    class adStileWidth : Connection
    {
        public StileWidth GetStileWidthById(int Id)
        {
            StileWidth stilewidth = new StileWidth();
            string sql = @"[spGetStileWidth] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "StileWidth", sql, _CN);
                if (ds.Tables["StileWidth"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["StileWidth"].Rows)
                    {
                        stilewidth = new StileWidth()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return stilewidth;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<StileWidth> GetAllStileWidth()
        {
            List<StileWidth> stilewidth = new List<StileWidth>();
            string sql = @"[spGetAllStileWidth]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "StileWidth", sql, _CN);
                if (ds.Tables["StileWidth"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["StileWidth"].Rows)
                    {
                        stilewidth.Add(new StileWidth()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return stilewidth;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertStileWidth(StileWidth pStileWidth)
        {
            string sql = @"[spInsertStileWidth] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pStileWidth.Width, pStileWidth.IdStatus, pStileWidth.CreationDate.ToString("yyyyMMdd"),
                pStileWidth.CreatorUser, pStileWidth.ModificationDate.ToString("yyyyMMdd"), pStileWidth.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateStileWidth(StileWidth pStileWidth)
        {
            string sql = @"[spUpdateStileWidth] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pStileWidth.Width, pStileWidth.IdStatus, pStileWidth.ModificationDate.ToString("yyyyMMdd"),
                pStileWidth.ModificationUser);
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
