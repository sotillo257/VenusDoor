﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using System.Data.SqlClient;
using System.Data;

namespace DataAccess
{
    public class adDoorStylexOutsideEdgeProfile : Connection
    {
        public DoorStylexOutsideEdgeProfile GetDoorStylexOutsideEdgeProfileById(int Id)
        {
            DoorStylexOutsideEdgeProfile doorxoutside = new DoorStylexOutsideEdgeProfile();
            string sql = @"[spGetDoorStylexOutsideEdgeProfile] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorStylexOutsideEdgeProfile", sql, _CN);
                if (ds.Tables["DoorStylexOutsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorStylexOutsideEdgeProfile"].Rows)
                    {
                        doorxoutside = new DoorStylexOutsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return doorxoutside;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DoorStylexOutsideEdgeProfile> GetAllDoorStylexOutsideEdgeProfile()
        {
            List<DoorStylexOutsideEdgeProfile> doorxoutside = new List<DoorStylexOutsideEdgeProfile>();
            string sql = @"[spGetAllDoorStylexOutsideEdgeProfile]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorStylexOutsideEdgeProfile", sql, _CN);
                if (ds.Tables["DoorStylexOutsideEdgeProfile"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorStylexOutsideEdgeProfile"].Rows)
                    {
                        doorxoutside.Add(new DoorStylexOutsideEdgeProfile()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return doorxoutside;
            }
            catch (Exception)
            {
                throw;
            }

        }

       

        public int InsertDoorStylexOutsideEdgeProfile(DoorStylexOutsideEdgeProfile pDoorStylexOutsideEdgeProfile)
        {
            string sql = @"[spInsertDoorStylexOutsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql, pDoorStylexOutsideEdgeProfile.DoorStyle.Id, pDoorStylexOutsideEdgeProfile.OutsideEdgeProfile.Id, pDoorStylexOutsideEdgeProfile.Status.Id,
                pDoorStylexOutsideEdgeProfile.CreatorUser, pDoorStylexOutsideEdgeProfile.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoorStylexOutsideEdgeProfile(DoorStylexOutsideEdgeProfile pDoorStylexOutsideEdgeProfile)
        {
            string sql = @"[spUpdateDoorStylexOutsideEdgeProfile] '{0}', '{1}', '{2}', '{3}', '{4}'";
            sql = string.Format(sql,pDoorStylexOutsideEdgeProfile.Id, pDoorStylexOutsideEdgeProfile.DoorStyle.Id, pDoorStylexOutsideEdgeProfile.OutsideEdgeProfile.Id, pDoorStylexOutsideEdgeProfile.Status.Id,
                pDoorStylexOutsideEdgeProfile.ModificationUser);
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
        /// @Descripción: Elimina DoorStylexOutsideEdgeProfile por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoorStylexOutsideEdgeProfile(int pId)
        {
            string sql = @"[spDeleteDoorStylexOutsideEdgeProfile] '{0}'";
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
