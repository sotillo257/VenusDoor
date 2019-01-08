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
    public class adStatus : Connection
    {
        public Status GetStatusById(int Id)
        {
            Status stats = new Status();
            string sql = @"[spGetStatus] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Status", sql, _CN);
                if (ds.Tables["Status"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Status"].Rows)
                    {
                        stats = new Status()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Group = new Group() { Id = int.Parse(item["IdGroup"].ToString()), Description = item["Description"].ToString() },

                        };
                    }
                }
                return stats;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Status> GetAllStatus()
        {
            List<Status> stats = new List<Status>();
            string sql = @"[spGetAllStatus]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Status", sql, _CN);
                if (ds.Tables["Status"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Status"].Rows)
                    {
                        stats.Add(new Status()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Group = new Group() { Id = int.Parse(item["IdGroup"].ToString()), Description = item["Description"].ToString() },

                        });
                    }
                }
                return stats;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertStatus(Status pStatus)
        {
            string sql = @"[spInsertStatus] '{0}', {1}";
            sql = string.Format(sql, pStatus.Description, pStatus.Group.Id);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateStatus(Status pStatus)
        {
            string sql = @"[spUpdateStatus] '{0}', {1}";
            sql = string.Format(sql, pStatus.Description, pStatus.Group.Id);
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
        /// @Descripción: Elimina Status por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteStatus(int pId)
        {
            string sql = @"[spDeleteStatus] '{0}'";
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
