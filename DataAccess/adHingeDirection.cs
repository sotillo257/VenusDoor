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
    public class adHingeDirection : Connection
    {
        public HingeDirection GetHingeDirectionById(int Id)
        {
            HingeDirection hinged = new HingeDirection();
            string sql = @"[spGetHingeDirection] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HingeDirection", sql, _CN);
                if (ds.Tables["HingeDirection"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HingeDirection"].Rows)
                    {
                        hinged = new HingeDirection()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Direction = item["Direction"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return hinged;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<HingeDirection> GetAllHingeDirection()
        {
            List<HingeDirection> hinged = new List<HingeDirection>();
            string sql = @"[spGetAllHingeDirection]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HingeDirection", sql, _CN);
                if (ds.Tables["HingeDirection"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HingeDirection"].Rows)
                    {
                        hinged.Add(new HingeDirection()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            Direction = item["Direction"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return hinged;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertHingeDirection(HingeDirection pHingeDirection)
        {
            string sql = @"[spInsertHingeDirection] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pHingeDirection.Direction, pHingeDirection.IdStatus, pHingeDirection.CreationDate.ToString("yyyyMMdd"),
                pHingeDirection.CreatorUser, pHingeDirection.ModificationDate.ToString("yyyyMMdd"), pHingeDirection.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateHingeDirection(HingeDirection pHingeDirection)
        {
            string sql = @"[spUpdateHingeDirection] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pHingeDirection.Direction, pHingeDirection.IdStatus, pHingeDirection.ModificationDate.ToString("yyyyMMdd"),
                pHingeDirection.ModificationUser);
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
