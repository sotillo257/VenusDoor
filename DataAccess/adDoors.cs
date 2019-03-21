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
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString(), },
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString(), },
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["DescripPanel"].ToString(), },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["DescripPanelMaterial"].ToString(), },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["DescripPreparation"].ToString(), },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString(), },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString(), },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DesccripIEP"].ToString(), },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdHorizontalDivisions"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()), },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position1 = item["HP1"].ToString(), Position2 = item["HP2"].ToString(), Position3 = item["HP3"].ToString(), Position4 = item["HP4"].ToString(), Position5 = item["HP5"].ToString(), },
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            DecimalsWidth = new Decimals() { Id = int.Parse(item["IdDecimalsWidth"].ToString()), Description = item["DescriptDW"].ToString(), Value = decimal.Parse(item["ValueDW"].ToString()) },
                            Height = decimal.Parse(item["Height"].ToString()),
                            DecimalsHeight = new Decimals() { Id = int.Parse(item["IdDecimalsHeight"].ToString()), Description = item["DescriptDH"].ToString(), Value = decimal.Parse(item["ValueDH"].ToString()) },
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()), Description = item["DescripDoorOption"].ToString() },
                            isOverlay = bool.Parse(item["isOverlay"].ToString()),
                            isFingerPull = bool.Parse(item["isFingerPull"].ToString()),

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

        public TotalesDoors GetTotalDoorsxCompany(int Company)
        {
            TotalesDoors door = new TotalesDoors();
            string sql = @"[spGetTotaleDoorsxCompany] '{0}'";
            sql = string.Format(sql, Company);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TotalesDoors", sql, _CN);
                if (ds.Tables["TotalesDoors"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TotalesDoors"].Rows)
                    {
                        door = new TotalesDoors()
                        {
                            DoorPending = int.Parse((item["DoorPending"].ToString() == "") ? "0" : item["DoorPending"].ToString()),
                            DoorApprove = int.Parse((item["DoorApprove"].ToString() == "") ? "0" : item["DoorApprove"].ToString()),
                            DoorInProcess = int.Parse((item["DoorInProcess"].ToString() == "") ? "0" : item["DoorInProcess"].ToString()),
                            DoorCompleted = int.Parse((item["DoorCompleted"].ToString() == "") ? "0" : item["DoorCompleted"].ToString()),
                            Active = int.Parse((item["Active"].ToString() == "") ? "0" : item["Active"].ToString()),
                            Pending = int.Parse((item["Pending"].ToString() == "") ? "0" : item["Pending"].ToString()),
                            Approve = int.Parse((item["Approved"].ToString() == "") ? "0" : item["Approved"].ToString()),
                            InProcess = int.Parse((item["InProcess"].ToString() == "") ? "0" : item["InProcess"].ToString()),
                            Completed = int.Parse((item["Completed"].ToString() == "") ? "0" : item["Completed"].ToString()),
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

        public TotalesDoors GetTotalDoors()
        {
            TotalesDoors door = new TotalesDoors();
            string sql = @"[spGetTotaleDoors] ";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "TotalesDoors", sql, _CN);
                if (ds.Tables["TotalesDoors"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["TotalesDoors"].Rows)
                    {
                        door = new TotalesDoors()
                        {
                            DoorPending = int.Parse((item["DoorPending"].ToString() == "") ? "0" : item["DoorPending"].ToString()),
                            DoorApprove = int.Parse((item["DoorApprove"].ToString() == "") ? "0" : item["DoorApprove"].ToString()),
                            DoorInProcess = int.Parse((item["DoorInProcess"].ToString() == "") ? "0" : item["DoorInProcess"].ToString()),
                            DoorCompleted = int.Parse((item["DoorCompleted"].ToString() == "") ? "0" : item["DoorCompleted"].ToString()),
                            Active = int.Parse((item["Active"].ToString() == "") ? "0" : item["Active"].ToString()),
                            Pending = int.Parse((item["Pending"].ToString() == "") ? "0" : item["Pending"].ToString()),
                            Approve = int.Parse((item["Approved"].ToString() == "") ? "0" : item["Approved"].ToString()),
                            InProcess = int.Parse((item["InProcess"].ToString() == "") ? "0" : item["InProcess"].ToString()),
                            Completed = int.Parse((item["Completed"].ToString() == "") ? "0" : item["Completed"].ToString()),
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
            List<Doors> door = new List<Doors>();
            string sql = @"[spGetAllDoors]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Doors", sql, _CN);
                if (ds.Tables["Doors"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Doors"].Rows)
                    {
                        door.Add(new Doors()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() }, 
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString(),},
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString(), },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString(), },
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["DescripPanel"].ToString(), },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["DescripPanelMaterial"].ToString(), },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["DescripPreparation"].ToString(), },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString(), },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString(), },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DesccripIEP"].ToString(), },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdHorizontalDivisions"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()), },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position1 = item["HP1"].ToString(), Position2 = item["HP2"].ToString(), Position3 = item["HP3"].ToString(), Position4 = item["HP4"].ToString(), Position5 = item["HP5"].ToString(), },
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            DecimalsWidth = new Decimals() { Id = int.Parse(item["IdDecimalsWidth"].ToString()), Description = item["DescriptDW"].ToString(), Value = decimal.Parse(item["ValueDW"].ToString()) },
                            Height = decimal.Parse(item["Height"].ToString()),
                            DecimalsHeight = new Decimals() { Id = int.Parse(item["IdDecimalsHeight"].ToString()), Description = item["DescriptDH"].ToString(), Value = decimal.Parse(item["ValueDH"].ToString()) },
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()), Description = item["DescripDoorOption"].ToString() },
                            isOverlay = bool.Parse(item["isOverlay"].ToString()),
                            isFingerPull = bool.Parse(item["isFingerPull"].ToString()),

                        });
                    }
                }
                return door;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoors(Doors pDoors)
        {
            string sql = @"[spInsertDoors] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}', '{26}', '{27}', '{28}', '{29}', '{30}'";
            sql = string.Format(sql, pDoors.DoorStyle.Id, pDoors.Material.Id, pDoors.TopRail.Id,pDoors.BottomRail.Id, 
                pDoors.Preparation.Id, pDoors.Join.Id, pDoors.OutsideEdgeProfile.Id, 
                pDoors.InsideEdgeProfile.Id, pDoors.VerticalDivisions.Id, pDoors.HorizontalDivisions.Id, pDoors.HingeDirection.Id, 
                pDoors.HingePositions.Id, (pDoors.isDrill == true) ? 1 : 0, pDoors.Width.ToString().Replace(',', '.'), pDoors.DecimalsWidth.Id, pDoors.Height.ToString().Replace(',', '.'), pDoors.DecimalsHeight.Id, (pDoors.IsOpeningMeasurement == true) ? 1 : 0, 
                pDoors.Status.Id, pDoors.CreationDate.ToString("yyyyMMdd"), pDoors.CreatorUser, pDoors.ModificationDate.ToString("yyyyMMdd"),
                pDoors.ModificationUser, pDoors.Picture, pDoors.ProfilePicture, pDoors.Panel.Id, pDoors.PanelMaterial.Id, pDoors.DoorType.Id, pDoors.DoorOption.Id, (pDoors.isOverlay == true) ? 1 : 0, (pDoors.isFingerPull == true) ? 1 : 0);
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
            string sql = @"[spUpdateDoors] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}', '{26}', '{27}', '{28}', '{29}'";
            sql = string.Format(sql, pDoors.Id, pDoors.DoorStyle.Id, pDoors.Material.Id, pDoors.TopRail.Id, pDoors.BottomRail.Id,
                pDoors.Preparation.Id, pDoors.Join.Id, pDoors.OutsideEdgeProfile.Id,
                pDoors.InsideEdgeProfile.Id, pDoors.VerticalDivisions.Id, pDoors.HorizontalDivisions.Id, pDoors.HingeDirection.Id,
                pDoors.HingePositions.Id, pDoors.Width.ToString().Replace(',', '.'), pDoors.DecimalsWidth.Id, pDoors.Height.ToString().Replace(',', '.'), pDoors.DecimalsHeight.Id, pDoors.IsOpeningMeasurement,
                pDoors.Status.Id, pDoors.ModificationDate.ToString("yyyyMMdd"),
                pDoors.ModificationUser, pDoors.Picture, pDoors.ProfilePicture, pDoors.Panel.Id, pDoors.PanelMaterial.Id, pDoors.DoorType.Id, pDoors.DoorOption.Id, (pDoors.isOverlay == true) ? 1 : 0, (pDoors.isFingerPull == true) ? 1 : 0);
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
