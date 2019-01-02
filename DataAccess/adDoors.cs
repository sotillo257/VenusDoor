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
    public class adDoors : Connection
    {
        public Doors GetDoorsById(int Id)
        {
            Doors door = new Doors();
            string sql = @"[spGetDoors] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Doors", sql, _CN);
                if (ds.Tables["Doors"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Doors"].Rows)
                    {
                        door = new Doors()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdOrder = int.Parse(item["IdOrder"].ToString()),
                            IdDoorStyle = int.Parse(item["IdDoorStyle"].ToString()),
                            IdMaterial = int.Parse(item["IdMaterial"].ToString()),
                            IdTopRail = int.Parse(item["IdTopRail"].ToString()),
                            IdBottomRail = int.Parse(item["IdBottomRail"].ToString()),
                            IdPreparation = int.Parse(item["IdPreparation"].ToString()),
                            IdJoin = int.Parse(item["IdJoin"].ToString()),
                            IdStileWidth = int.Parse(item["IdStileWidth"].ToString()),
                            IdRailWidth = int.Parse(item["IdRailWidth"].ToString()),
                            IdOutsideEdgeProfile = int.Parse(item["IdOutsideEdgeProfile"].ToString()),
                            IdInsideEdgeProfile = int.Parse(item["IdInsideEdgeProfile"].ToString()),
                            IdVerticalDivisions = int.Parse(item["IdVerticalDivisions"].ToString()),
                            IdHorizontalDivisions = int.Parse(item["IdHorizontalDivisions"].ToString()),
                            IdHingeDirection = int.Parse(item["IdHingeDirection"].ToString()),
                            IdHingePositions = int.Parse(item["IdHingePositions"].ToString()),
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            Height = decimal.Parse(item["Height"].ToString()),
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),

                        };
                    }
                }
                return door;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Doors> GetAllDoors()
        {
            List<Doors> doors = new List<Doors>();
            string sql = @"[spGetAllDoors]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Doors", sql, _CN);
                if (ds.Tables["Doors"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Doors"].Rows)
                    {
                        doors.Add(new Doors()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdOrder = int.Parse(item["IdOrder"].ToString()),
                            IdDoorStyle = int.Parse(item["IdDoorStyle"].ToString()),
                            IdMaterial = int.Parse(item["IdMaterial"].ToString()),
                            IdTopRail = int.Parse(item["IdTopRail"].ToString()),
                            IdBottomRail = int.Parse(item["IdBottomRail"].ToString()),
                            IdPreparation = int.Parse(item["IdPreparation"].ToString()),
                            IdJoin = int.Parse(item["IdJoin"].ToString()),
                            IdStileWidth = int.Parse(item["IdStileWidth"].ToString()),
                            IdRailWidth = int.Parse(item["IdRailWidth"].ToString()),
                            IdOutsideEdgeProfile = int.Parse(item["IdOutsideEdgeProfile"].ToString()),
                            IdInsideEdgeProfile = int.Parse(item["IdInsideEdgeProfile"].ToString()),
                            IdVerticalDivisions = int.Parse(item["IdVerticalDivisions"].ToString()),
                            IdHorizontalDivisions = int.Parse(item["IdHorizontalDivisions"].ToString()),
                            IdHingeDirection = int.Parse(item["IdHingeDirection"].ToString()),
                            IdHingePositions = int.Parse(item["IdHingePositions"].ToString()),
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            Height = decimal.Parse(item["Height"].ToString()),
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            IdStatus = int.Parse(item["IdStatus"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),

                        });
                    }
                }
                return doors;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoors(Doors pDoors)
        {
            string sql = @"[spInsertDoors] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{8}', '{9}', '{10}', '{11}', 
            '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}, '{26}'";
            sql = string.Format(sql, pDoors.IdOrder, pDoors.IdDoorStyle, pDoors.IdMaterial, pDoors.IdTopRail,pDoors.IdBottomRail, 
                pDoors.IdPreparation, pDoors.IdJoin, pDoors.IdStileWidth, pDoors.IdRailWidth, pDoors.IdOutsideEdgeProfile, 
                pDoors.IdInsideEdgeProfile, pDoors.IdVerticalDivisions, pDoors.IdHorizontalDivisions, pDoors.IdHingeDirection, 
                pDoors.IdHingePositions, pDoors.isDrill, pDoors.Width, pDoors.Height, pDoors.IsOpeningMeasurement, pDoors.Quantity, 
                pDoors.IdStatus, pDoors.CreationDate.ToString("yyyyMMdd"), pDoors.CreatorUser, pDoors.ModificationDate.ToString("yyyyMMdd"),
                pDoors.ModificationUser, pDoors.Picture, pDoors.ProfilePicture);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoors(Doors pDoors)
        {
            string sql = @"[spUpdateDoors] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{8}', '{9}', '{10}', '{11}', 
            '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}'";
            sql = string.Format(sql, pDoors.IdOrder, pDoors.IdDoorStyle, pDoors.IdMaterial, pDoors.IdTopRail, pDoors.IdBottomRail,
                pDoors.IdPreparation, pDoors.IdJoin, pDoors.IdStileWidth, pDoors.IdRailWidth, pDoors.IdOutsideEdgeProfile,
                pDoors.IdInsideEdgeProfile, pDoors.IdVerticalDivisions, pDoors.IdHorizontalDivisions, pDoors.IdHingeDirection,
                pDoors.IdHingePositions, pDoors.isDrill, pDoors.Width, pDoors.Height, pDoors.IsOpeningMeasurement, pDoors.Quantity,
                pDoors.IdStatus, pDoors.ModificationDate.ToString("yyyyMMdd"), pDoors.ModificationUser, pDoors.Picture, pDoors.ProfilePicture);
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
