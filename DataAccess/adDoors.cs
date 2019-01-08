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
                ds = _MB.CreaDS(ds, "Door", sql, _CN);
                if (ds.Tables["Door"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Door"].Rows)
                    {
                        door = new Doors()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString(), },
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString(), },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["DescripPreparation"].ToString(), },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString(), },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString(), },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DesccripIEP"].ToString(), },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdTopRail"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()), },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdTopRail"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdTopRail"].ToString()), Position = item["HingerPosition"].ToString(), },                            
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
                ds = _MB.CreaDS(ds, "Door", sql, _CN);
                if (ds.Tables["Door"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Door"].Rows)
                    {
                        doors.Add(new Doors()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() }, 
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString(),},
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString(), },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["DescripPreparation"].ToString(), },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString(), },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString(), },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DesccripIEP"].ToString(), },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdTopRail"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()), },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdTopRail"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdTopRail"].ToString()), Position = item["HingerPosition"].ToString(), },
                            StileWidth = new StileWidth() { Id = int.Parse(item["IdStileWidth"].ToString())},
                            RailWidth = new RailWidth() { Id = int.Parse(item["IdRailWidth"].ToString()) },
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
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["DescripPanelMaterial"].ToString(), },
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["DescripPanel"].ToString(), },

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
            sql = string.Format(sql, pDoors.DoorStyle, pDoors.Material, pDoors.TopRail,pDoors.BottomRail, 
                pDoors.Preparation, pDoors.Join, pDoors.StileWidth, pDoors.RailWidth, pDoors.OutsideEdgeProfile, 
                pDoors.InsideEdgeProfile, pDoors.VerticalDivisions, pDoors.HorizontalDivisions, pDoors.HingeDirection, 
                pDoors.HingePositions, pDoors.isDrill, pDoors.Width, pDoors.Height, pDoors.IsOpeningMeasurement, pDoors.Quantity, 
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
            sql = string.Format(sql, pDoors.DoorStyle, pDoors.Material, pDoors.TopRail, pDoors.BottomRail,
                pDoors.Preparation, pDoors.Join, pDoors.StileWidth, pDoors.RailWidth, pDoors.OutsideEdgeProfile,
                pDoors.InsideEdgeProfile, pDoors.VerticalDivisions, pDoors.HorizontalDivisions, pDoors.HingeDirection,
                pDoors.HingePositions, pDoors.isDrill, pDoors.Width, pDoors.Height, pDoors.IsOpeningMeasurement, pDoors.Quantity,
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

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Elimina Doors por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoors(int pId)
        {
            string sql = @"[spDeleteDoors] '{0}'";
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
