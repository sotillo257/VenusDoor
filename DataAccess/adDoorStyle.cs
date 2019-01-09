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
    public class adDoorStyle : Connection
    {
        public DoorStyle GetDoorStyleById(int Id)
        {
            DoorStyle doorStyle = new DoorStyle();
            string sql = @"[spGetDoorStyle] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorStyle", sql, _CN);
                if (ds.Tables["DoorStyle"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorStyle"].Rows)
                    {
                        doorStyle = new DoorStyle()
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
                return doorStyle;
            }
            catch (Exception)
            {
                throw;
            }
          
        }

        public List<DoorStyle> GetAllDoorStyle()
        {
            List<DoorStyle> doorStyle = new List<DoorStyle>();
            string sql = @"[spGetAllDoorStyle]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorStyle", sql, _CN);
                if (ds.Tables["DoorStyle"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorStyle"].Rows)
                    {
                        doorStyle.Add(new DoorStyle()
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
                return doorStyle;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoorStyle(DoorStyle pDoorStyle)
        {
            string sql = @"[spInsertDoorStyle] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pDoorStyle.Description, pDoorStyle.Status.Id, pDoorStyle.CreationDate.ToString("yyyyMMdd"), 
                pDoorStyle.CreatorUser, pDoorStyle.ModificationDate.ToString("yyyyMMdd"), pDoorStyle.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoorStyle(DoorStyle pDoorStyle)
        {
            string sql = @"[spUpdateDoorStyle] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pDoorStyle.Description, pDoorStyle.Status.Id, pDoorStyle.ModificationDate.ToString("yyyyMMdd"), 
                pDoorStyle.ModificationUser);
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
        /// @Descripción: Elimina Door Style por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoorStyle(int pId)
        {
            string sql = @"[spDeleteDoorStyle] '{0}'";
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
