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
    public class adGroup : Connection
    {
        public Group GetGroupById(int Id)
        {
            Group grupo = new Group();
            string sql = @"[spGetGroup] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Group", sql, _CN);
                if (ds.Tables["Group"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Group"].Rows)
                    {
                        grupo = new Group()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),

                        };
                    }
                }
                return grupo;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Group> GetAllGroup()
        {
            List<Group> grupo = new List<Group>();
            string sql = @"[spGetAllGroup]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Group", sql, _CN);
                if (ds.Tables["Group"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Group"].Rows)
                    {
                        grupo.Add(new Group()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),

                        });
                    }
                }
                return grupo;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertGroup(Group pGroup)
        {
            string sql = @"[spInsertGroup] '{0}'";
            sql = string.Format(sql, pGroup.Description);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateGroup(Group pGroup)
        {
            string sql = @"[spUpdateGroup] '{0}'";
            sql = string.Format(sql, pGroup.Description);
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
