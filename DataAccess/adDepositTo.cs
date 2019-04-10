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
    public class adDepositTo : Connection
    {
        public DepositTo GetDepositToById(int Id)
        {
            DepositTo dpt = new DepositTo();
            string sql = @"[spGetDepositTo] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DepositTo", sql, _CN);
                if (ds.Tables["DepositTo"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DepositTo"].Rows)
                    {
                        dpt = new DepositTo()
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
                return dpt;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DepositTo> GetAllDepositTo()
        {
            List<DepositTo> dpt = new List<DepositTo>();
            string sql = @"[spGetAllDepositTo]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DepositTo", sql, _CN);
                if (ds.Tables["DepositTo"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DepositTo"].Rows)
                    {
                        dpt.Add(new DepositTo()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return dpt;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDepositTo(DepositTo pDepositTo)
        {
            string sql = @"[spInsertDepositTo] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pDepositTo.Description, pDepositTo.Status.Id, pDepositTo.CreationDate.ToString("yyyyMMdd"),
                pDepositTo.CreatorUser, pDepositTo.ModificationDate.ToString("yyyyMMdd"), pDepositTo.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDepositTo(DepositTo pDepositTo)
        {
            string sql = @"[spUpdateDepositTo] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDepositTo.Id, pDepositTo.Description, pDepositTo.Status.Id, pDepositTo.ModificationDate.ToString("yyyyMMdd"),
                pDepositTo.ModificationUser);
            try
            {
                _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteDepositTo(int pId)
        {
            string sql = @"[spDeleteDepositTo] '{0}'";
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