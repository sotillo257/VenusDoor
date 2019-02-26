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
    public class adDoorOption : Connection
    {
        public DoorOption GetDoorOptionById(int Id)
        {
            DoorOption pDoorOption = new DoorOption();
            string sql = @"[spGetDoorOption] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorOption", sql, _CN);
                if (ds.Tables["DoorOption"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorOption"].Rows)
                    {
                        pDoorOption = new DoorOption()
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
                return pDoorOption;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DoorOption> GetAllDoorOption()
        {
            List<DoorOption> pDoorOption = new List<DoorOption>();
            string sql = @"[spGetAllDoorOption]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorOption", sql, _CN);
                if (ds.Tables["DoorOption"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorOption"].Rows)
                    {
                        pDoorOption.Add(new DoorOption()
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
                return pDoorOption;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoorOption(DoorOption pDoorOption)
        {
            string sql = @"[spInsertDoorOption] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pDoorOption.Description, pDoorOption.Status.Id, pDoorOption.CreationDate.ToString("yyyyMMdd"),
                pDoorOption.CreatorUser, pDoorOption.ModificationDate.ToString("yyyyMMdd"), pDoorOption.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoorOption(DoorOption pDoorOption)
        {
            string sql = @"[spUpdateDoorOption] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDoorOption.Id, pDoorOption.Description, pDoorOption.Status.Id, pDoorOption.ModificationDate.ToString("yyyyMMdd"),
                pDoorOption.ModificationUser);
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
        /// @Descripción: Elimina DoorOption por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoorOption(int pId)
        {
            string sql = @"[spDeleteDoorOption] '{0}'";
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
