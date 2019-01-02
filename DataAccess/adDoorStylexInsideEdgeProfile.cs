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
                            IdDoorStyle = int.Parse(item["IdDoorStyle"].ToString()),
                            IdInsideEdgeProfile = int.Parse(item["IdInsideEdgeProfile"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
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
                            IdDoorStyle = int.Parse(item["IdDoorStyle"].ToString()),
                            IdInsideEdgeProfile = int.Parse(item["IdInsideEdgeProfile"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
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
            string sql = @"[spInsertDoorStylexInsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}','{6}'";
            sql = string.Format(sql, pDoorStylexInsideEdgeProfile.IdDoorStyle, pDoorStylexInsideEdgeProfile.IdInsideEdgeProfile, pDoorStylexInsideEdgeProfile.IdStatus, pDoorStylexInsideEdgeProfile.CreationDate.ToString("yyyyMMdd"),
                pDoorStylexInsideEdgeProfile.CreatorUser, pDoorStylexInsideEdgeProfile.ModificationDate.ToString("yyyyMMdd"), pDoorStylexInsideEdgeProfile.ModificationUser);
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
            sql = string.Format(sql, pDoorStylexInsideEdgeProfile.IdDoorStyle, pDoorStylexInsideEdgeProfile.IdInsideEdgeProfile, pDoorStylexInsideEdgeProfile.IdStatus, pDoorStylexInsideEdgeProfile.ModificationDate.ToString("yyyyMMdd"),
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
    }
}
