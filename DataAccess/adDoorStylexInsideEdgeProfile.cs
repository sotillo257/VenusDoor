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
    public class adDoorStylexInsideEdgeProfile : Connection
    {
        public DoorStylexInsideEdgeProfile GetDoorStylexInsideEdgeProfileById(int Id)
        {
            DoorStylexInsideEdgeProfile doorxinside = new DoorStylexInsideEdgeProfile();
            string sql = @"[spGetDoorStylexInsideEdgeProfile] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorStylexInsideEdgeProfile", sql, _CN);
                if (ds.Tables["DoorStylexInsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorStylexInsideEdgeProfile"].Rows)
                    {
                        doorxinside = new DoorStylexInsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DescriptIEP"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return doorxinside;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DoorStylexInsideEdgeProfile> GetAllDoorStylexInsideEdgeProfile()
        {
            List<DoorStylexInsideEdgeProfile> doorxinside = new List<DoorStylexInsideEdgeProfile>();
            string sql = @"[spGetAllDoorStylexInsideEdgeProfile]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorStylexInsideEdgeProfile", sql, _CN);
                if (ds.Tables["DoorStylexInsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorStylexInsideEdgeProfile"].Rows)
                    {
                        doorxinside.Add(new DoorStylexInsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DescriptIEP"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return doorxinside;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoorStylexInsideEdgeProfile(DoorStylexInsideEdgeProfile pDoorStylexInsideEdgeProfile)
        {
            string sql = @"[spInsertDoorStylexInsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDoorStylexInsideEdgeProfile.DoorStyle.Id, pDoorStylexInsideEdgeProfile.InsideEdgeProfile.Id, pDoorStylexInsideEdgeProfile.Status.Id,
                pDoorStylexInsideEdgeProfile.CreatorUser, pDoorStylexInsideEdgeProfile.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoorStylexInsideEdgeProfile(DoorStylexInsideEdgeProfile pDoorStylexInsideEdgeProfile)
        {
            string sql = @"[spUpdateDoorStylexInsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pDoorStylexInsideEdgeProfile.Id, pDoorStylexInsideEdgeProfile.DoorStyle.Id, pDoorStylexInsideEdgeProfile.InsideEdgeProfile.Id, pDoorStylexInsideEdgeProfile.Status.Id,
                pDoorStylexInsideEdgeProfile.ModificationUser);
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
        /// @Descripción: Elimina DoorStylexInsideEdgeProfile por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoorStylexInsideEdgeProfile(int pId)
        {
            string sql = @"[spDeleteDoorStylexInsideEdgeProfile] '{0}'";
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
