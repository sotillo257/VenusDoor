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
    public class adDoorType : Connection
    {
        public DoorType GetDoorTypeById(int Id)
        {
            DoorType pDoorType = new DoorType();
            string sql = @"[spGetDoorType] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorType", sql, _CN);
                if (ds.Tables["DoorType"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorType"].Rows)
                    {
                        pDoorType = new DoorType()
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
                return pDoorType;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DoorType> GetAllDoorType()
        {
            List<DoorType> pDoorType = new List<DoorType>();
            string sql = @"[spGetAllDoorType]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorType", sql, _CN);
                if (ds.Tables["DoorType"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorType"].Rows)
                    {
                        pDoorType.Add(new DoorType()
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
                return pDoorType;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoorType(DoorType pDoorType)
        {
            string sql = @"[spInsertDoorType] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pDoorType.Description, pDoorType.Status.Id,
                pDoorType.CreatorUser, pDoorType.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoorType(DoorType pDoorType)
        {
            string sql = @"[spUpdateDoorType] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pDoorType.Id, pDoorType.Description, pDoorType.Status.Id,
                pDoorType.ModificationUser);
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
        /// @Descripción: Elimina DoorType por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoorType(int pId)
        {
            string sql = @"[spDeleteDoorType] '{0}'";
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
