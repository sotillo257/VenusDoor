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
                            Height = decimal.Parse(item["Height"].ToString()),
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            User = new User() {Id = int.Parse(item["IdUser"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["DescripPanel"].ToString() },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["DescripPanelMaterial"].ToString() },

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
                            Height = decimal.Parse(item["Height"].ToString()),
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            SubTotal = decimal.Parse(item["SubTotal"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),
                            Panel = new Panel() { Id = int.Parse(item["IdPanel"].ToString()), Description = item["DescripPanel"].ToString() },
                            PanelMaterial = new PanelMaterial() { Id = int.Parse(item["IdPanelMaterial"].ToString()), Description = item["DescripPanelMaterial"].ToString() },

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
            string sql = @"[spInsertDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}', '{26}', '{27}', '{28}'";
            sql = string.Format(sql, pDoorsxUser.Order.Id, pDoorsxUser.DoorStyle.Id, pDoorsxUser.Material.Id, pDoorsxUser.TopRail.Id, pDoorsxUser.BottomRail.Id, 
                pDoorsxUser.Preparation.Id, pDoorsxUser.Join.Id, pDoorsxUser.OutsideEdgeProfile.Id, 
                pDoorsxUser.InsideEdgeProfile.Id, pDoorsxUser.VerticalDivisions.Id, pDoorsxUser.HorizontalDivisions.Id, pDoorsxUser.HingeDirection.Id, 
                pDoorsxUser.HingePositions.Id, (pDoorsxUser.isDrill == true) ? 1 : 0, pDoorsxUser.Width, pDoorsxUser.Height, (pDoorsxUser.IsOpeningMeasurement == true) ? 1 : 0, pDoorsxUser.Quantity, pDoorsxUser.SubTotal, pDoorsxUser.User.Id, 
                pDoorsxUser.Status.Id, pDoorsxUser.CreationDate.ToString("yyyy-MM-dd"), pDoorsxUser.CreatorUser, pDoorsxUser.ModificationDate.ToString("yyyy-MM-dd"),
                pDoorsxUser.ModificationUser, pDoorsxUser.Picture, pDoorsxUser.ProfilePicture, pDoorsxUser.Panel.Id, pDoorsxUser.PanelMaterial.Id);
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
            string sql = @"[spUpdateDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}', '{26}', '{27}'";
            sql = string.Format(sql, pDoorsxUser.Id, pDoorsxUser.Order.Id, pDoorsxUser.DoorStyle.Id, pDoorsxUser.Material.Id, pDoorsxUser.TopRail.Id, pDoorsxUser.BottomRail.Id,
                pDoorsxUser.Preparation.Id, pDoorsxUser.Join.Id, pDoorsxUser.OutsideEdgeProfile.Id,
                pDoorsxUser.InsideEdgeProfile.Id, pDoorsxUser.VerticalDivisions.Id, pDoorsxUser.HorizontalDivisions.Id, pDoorsxUser.HingeDirection.Id,
                pDoorsxUser.HingePositions.Id, (pDoorsxUser.isDrill == true) ? 1 : 0, pDoorsxUser.Width, pDoorsxUser.Height, (pDoorsxUser.IsOpeningMeasurement == true) ? 1 : 0, pDoorsxUser.Quantity, pDoorsxUser.SubTotal, pDoorsxUser.User.Id,
                pDoorsxUser.Status.Id, pDoorsxUser.ModificationDate.ToString("yyyy-MM-dd"), pDoorsxUser.ModificationUser, pDoorsxUser.Picture, pDoorsxUser.ProfilePicture, pDoorsxUser.Panel.Id, pDoorsxUser.PanelMaterial.Id);
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
