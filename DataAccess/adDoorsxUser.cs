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
    public class adDoorsxUser : Connection
    {
        public DoorsxUser GetDoorsxUserById(int Id)
        {
            DoorsxUser doorxu = new DoorsxUser();
            string sql = @"[spGetDoorsxUser] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorsxUser", sql, _CN);
                if (ds.Tables["DoorsxUser"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorsxUser"].Rows)
                    {
                        doorxu = new DoorsxUser()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Order =  new Order() { Id = int.Parse(item["IdOrder"].ToString())},
                            DoorStyle = new DoorStyle() {Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString() },
                            TopRail  = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString()},
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString() },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["DescripPreparation"].ToString() },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString() },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString() },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DesccripIEP"].ToString() },
                            VerticalDivisions = new VerticalDivisions() {Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()) },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdHorizontalDivisions"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()) },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position1 = item["HP1"].ToString(), Position2 = item["HP2"].ToString(), Position3 = item["HP3"].ToString(), Position4 = item["HP4"].ToString(), Position5 = item["HP5"].ToString(), },
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            DecimalsWidth = new Decimals() { Id = int.Parse(item["IdDecimalsWidth"].ToString()), Description = item["DescriptDW"].ToString(), Value = decimal.Parse(item["ValueDW"].ToString()) },
                            Height = decimal.Parse(item["Height"].ToString()),
                            DecimalsHeight = new Decimals() { Id = int.Parse(item["IdDecimalsHeight"].ToString()), Description = item["DescriptDH"].ToString(), Value = decimal.Parse(item["ValueDH"].ToString()) },
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            ItemCost = decimal.Parse(item["ItemCost"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            User = new User() {Id = int.Parse(item["IdUser"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["DescripPanel"].ToString() },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["DescripPanelMaterial"].ToString() },
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()), Description = item["DescripDoorOption"].ToString() },
                            isOverlay = bool.Parse(item["isOverlay"].ToString()),
                            isFingerPull = bool.Parse(item["isFingerPull"].ToString()),
                        };
                    }
                }
                return doorxu;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DoorsxUser> GetAllDoorsxUser()
        {
            List<DoorsxUser> doorxu = new List<DoorsxUser>();
            string sql = @"[spGetAllDoorsxUser]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorsxUser", sql, _CN);
                if (ds.Tables["DoorsxUser"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorsxUser"].Rows)
                    {
                      
                            doorxu.Add(new DoorsxUser()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Order = new Order() { Id = int.Parse(item["IdOrder"].ToString()) },
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["DescripDoorStyle"].ToString() },
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString() },
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["DescripTopRail"].ToString() },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString() },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["DescripPreparation"].ToString() },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["DescripJoin"].ToString() },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["DescriptOEP"].ToString() },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["DesccripIEP"].ToString() },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["VerticalDivision"].ToString()) },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdHorizontalDivisions"].ToString()), Quantity = int.Parse(item["HorizontalDivision"].ToString()) },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position1 = item["HP1"].ToString(), Position2 = item["HP2"].ToString(), Position3 = item["HP3"].ToString(), Position4 = item["HP4"].ToString(), Position5 = item["HP5"].ToString(), },
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            DecimalsWidth = new Decimals() { Id = int.Parse(item["IdDecimalsWidth"].ToString()), Description = item["DescriptDW"].ToString(), Value = decimal.Parse(item["ValueDW"].ToString()) },
                            Height = decimal.Parse(item["Height"].ToString()),
                            DecimalsHeight = new Decimals() { Id = int.Parse(item["IdDecimalsHeight"].ToString()), Description = item["DescriptDH"].ToString(), Value = decimal.Parse(item["ValueDH"].ToString()) },
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            ItemCost = decimal.Parse(item["ItemCost"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = DateTime.Parse(item["CreationDate"].ToString()),
                            ModificationDate = DateTime.Parse(item["ModificationDate"].ToString()),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["DescripPanel"].ToString() },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["DescripPanelMaterial"].ToString() },
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()) },
                            isOverlay = bool.Parse(item["isOverlay"].ToString()),
                            isFingerPull = bool.Parse(item["isFingerPull"].ToString()),
                        });
                    }
                }
                return doorxu;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoorsxUser(DoorsxUser pDoorsxUser)
        {
            decimal total = Convert.ToDecimal(pDoorsxUser.ItemCost);
            decimal subto = Convert.ToDecimal(pDoorsxUser.SubTotal);
            string sql = @"[spInsertDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}', '{26}', '{27}', '{28}', '{29}', '{30}', '{31}', '{32}', '{33}', '{34}', '{35}'";
            sql = string.Format(sql, pDoorsxUser.Order.Id, pDoorsxUser.DoorStyle.Id, pDoorsxUser.Material.Id, pDoorsxUser.TopRail.Id, pDoorsxUser.BottomRail.Id, 
                pDoorsxUser.Preparation.Id, pDoorsxUser.Join.Id, pDoorsxUser.OutsideEdgeProfile.Id, 
                pDoorsxUser.InsideEdgeProfile.Id, pDoorsxUser.VerticalDivisions.Id, pDoorsxUser.HorizontalDivisions.Id, pDoorsxUser.HingeDirection.Id, 
                pDoorsxUser.HingePositions.Id, (pDoorsxUser.isDrill == true) ? 1 : 0, pDoorsxUser.Width.ToString().Replace(',', '.'), pDoorsxUser.DecimalsWidth.Id, pDoorsxUser.Height.ToString().Replace(',', '.'), pDoorsxUser.DecimalsHeight.Id, (pDoorsxUser.IsOpeningMeasurement == true) ? 1 : 0, pDoorsxUser.Quantity, total.ToString().Replace(',', '.'), subto.ToString().Replace(',', '.'), pDoorsxUser.User.Id, 
                pDoorsxUser.Status.Id, pDoorsxUser.CreationDate.ToString("yyyyMMdd HH:mm:ss"), pDoorsxUser.CreatorUser, pDoorsxUser.ModificationDate.ToString("yyyyMMdd HH:mm:ss"),
                pDoorsxUser.ModificationUser, pDoorsxUser.Picture, pDoorsxUser.ProfilePicture, pDoorsxUser.Panel.Id, pDoorsxUser.PanelMaterial.Id, pDoorsxUser.DoorType.Id, pDoorsxUser.DoorOption.Id, (pDoorsxUser.isOverlay == true) ? 1 : 0, (pDoorsxUser.isFingerPull == true) ? 1 : 0);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoorsxUser(DoorsxUser pDoorsxUser)
        {
            decimal total = Convert.ToDecimal(pDoorsxUser.ItemCost);
            decimal subto = Convert.ToDecimal(pDoorsxUser.SubTotal);
            string sql = @"[spUpdateDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}', '{26}', '{27}', '{28}', '{29}', '{30}', '{31}', '{32}', '{33}', '{34}'";
            sql = string.Format(sql, pDoorsxUser.Id, pDoorsxUser.Order.Id, pDoorsxUser.DoorStyle.Id, pDoorsxUser.Material.Id, pDoorsxUser.TopRail.Id, pDoorsxUser.BottomRail.Id,
                pDoorsxUser.Preparation.Id, pDoorsxUser.Join.Id, pDoorsxUser.OutsideEdgeProfile.Id,
                pDoorsxUser.InsideEdgeProfile.Id, pDoorsxUser.VerticalDivisions.Id, pDoorsxUser.HorizontalDivisions.Id, pDoorsxUser.HingeDirection.Id,
                pDoorsxUser.HingePositions.Id, (pDoorsxUser.isDrill == true) ? 1 : 0, pDoorsxUser.Width.ToString().Replace(',', '.'), pDoorsxUser.DecimalsWidth.Id, pDoorsxUser.Height.ToString().Replace(',', '.'), pDoorsxUser.DecimalsHeight.Id, (pDoorsxUser.IsOpeningMeasurement == true) ? 1 : 0, pDoorsxUser.Quantity, total.ToString().Replace(',', '.'), subto.ToString().Replace(',', '.'), pDoorsxUser.User.Id,
                pDoorsxUser.Status.Id, pDoorsxUser.ModificationDate.ToString("yyyyMMdd HH:mm:ss"), pDoorsxUser.ModificationUser, pDoorsxUser.Picture, pDoorsxUser.ProfilePicture, pDoorsxUser.Panel.Id, pDoorsxUser.PanelMaterial.Id, pDoorsxUser.DoorType.Id, pDoorsxUser.DoorOption.Id, (pDoorsxUser.isOverlay == true) ? 1 : 0, (pDoorsxUser.isFingerPull == true) ? 1 : 0);
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
        /// @Descripción: Elimina DoorsxUser por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoorsxUser(int pId)
        {
            string sql = @"[spDeleteDoorsxUser] '{0}'";
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

        public void DeleteAllDoorsxUserByOrder(int pId)
        {
            string sql = @"[spDeleteAllDoorsxUserByOrder] '{0}'";
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
