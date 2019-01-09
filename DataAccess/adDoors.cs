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
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["Description"].ToString() },
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["Description"].ToString(), },
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["Description"].ToString(), },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["Description"].ToString(), },
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["Description"].ToString(), },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["Description"].ToString(), },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["Description"].ToString(), },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString(), },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["Description"].ToString(), },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["Description"].ToString(), },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["Description"].ToString()), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdTopRail"].ToString()), Quantity = int.Parse(item["Description"].ToString()), },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["Description"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position = item["Description"].ToString(), },                            
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            Height = decimal.Parse(item["Height"].ToString()),
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            Status = new Status() {Id = int.Parse(item["IdStatus"].ToString()), Description = item["Description"].ToString()},
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
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["Description"].ToString(), },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["Description"].ToString(), },
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
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
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
            string sql = @"[spInsertDoors] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}'";
            sql = string.Format(sql, pDoors.DoorStyle.Id, pDoors.Material.Id, pDoors.TopRail.Id,pDoors.BottomRail.Id, 
                pDoors.Preparation.Id, pDoors.Join.Id, pDoors.OutsideEdgeProfile.Id, 
                pDoors.InsideEdgeProfile.Id, pDoors.VerticalDivisions.Id, pDoors.HorizontalDivisions.Id, pDoors.HingeDirection.Id, 
                pDoors.HingePositions.Id, pDoors.isDrill, pDoors.Width, pDoors.Height, pDoors.IsOpeningMeasurement, pDoors.Quantity, 
                pDoors.Status.Id, pDoors.CreationDate.ToString("yyyy-MM-dd"), pDoors.CreatorUser, pDoors.ModificationDate.ToString("yyyy-MM-dd"),
                pDoors.ModificationUser, pDoors.Picture, pDoors.ProfilePicture, pDoors.Panel.Id, pDoors.PanelMaterial.Id);
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
            string sql = @"[spInsertDoors] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}'";
            sql = string.Format(sql, pDoors.DoorStyle.Id, pDoors.Material.Id, pDoors.TopRail.Id, pDoors.BottomRail.Id,
                pDoors.Preparation.Id, pDoors.Join.Id, pDoors.OutsideEdgeProfile.Id,
                pDoors.InsideEdgeProfile.Id, pDoors.VerticalDivisions.Id, pDoors.HorizontalDivisions.Id, pDoors.HingeDirection.Id,
                pDoors.HingePositions.Id, pDoors.isDrill, pDoors.Width, pDoors.Height, pDoors.IsOpeningMeasurement, pDoors.Quantity,
                pDoors.Status.Id, pDoors.ModificationDate.ToString("yyyy-MM-dd"),
                pDoors.ModificationUser, pDoors.Picture, pDoors.ProfilePicture, pDoors.Panel.Id, pDoors.PanelMaterial.Id);
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
