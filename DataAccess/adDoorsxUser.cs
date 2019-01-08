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
                            Order =  new Order() { Id = int.Parse(item["Id"].ToString()) },
                            DoorStyle = new DoorStyle() {Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["Description"].ToString() },
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["Description"].ToString() },
                            TopRail  = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["Description"].ToString()},
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["Description"].ToString() },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["Description"].ToString() },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["Description"].ToString() },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["Description"].ToString() },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["Description"].ToString() },
                            VerticalDivisions = new VerticalDivisions() {Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["Quantity"].ToString()) },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdHorizontalDivisions"].ToString()), Quantity = int.Parse(item["Quantity"].ToString()) },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdTopRail"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdTopRail"].ToString()), Position = item["HingerPosition"].ToString(), },
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            Height = decimal.Parse(item["Height"].ToString()),
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            User = new User() {Id = int.Parse(item["IdUser"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()) },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),

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
                            DoorStyle = new DoorStyle() { Id = int.Parse(item["IdDoorStyle"].ToString()), Description = item["Description"].ToString() },
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["Description"].ToString() },
                            TopRail = new TopRail() { Id = int.Parse(item["IdTopRail"].ToString()), Description = item["Description"].ToString() },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["Description"].ToString() },
                            Preparation = new Preparation() { Id = int.Parse(item["IdPreparation"].ToString()), Description = item["Description"].ToString() },
                            Join = new Join() { Id = int.Parse(item["IdJoin"].ToString()), Description = item["Description"].ToString() },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = int.Parse(item["IdOutsideEdgeProfile"].ToString()), Description = item["Description"].ToString() },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = int.Parse(item["IdInsideEdgeProfile"].ToString()), Description = item["Description"].ToString() },
                            VerticalDivisions = new VerticalDivisions() { Id = int.Parse(item["IdVerticalDivisions"].ToString()), Quantity = int.Parse(item["Quantity"].ToString()) },
                            HorizontalDivisions = new HorizontalDivisions() { Id = int.Parse(item["IdHorizontalDivisions"].ToString()), Quantity = int.Parse(item["Quantity"].ToString()) },
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["Direction"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position = item["Position"].ToString(), },
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            Width = decimal.Parse(item["Width"].ToString()),
                            Height = decimal.Parse(item["Height"].ToString()),
                            IsOpeningMeasurement = bool.Parse(item["IsOpeningMeasurement"].ToString()),
                            Quantity = int.Parse(item["Quantity"].ToString()),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()) },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()) },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),
                            Picture = item["Picture"].ToString(),
                            ProfilePicture = item["ProfilePicture"].ToString(),

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
            string sql = @"[spInsertDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}'";
            sql = string.Format(sql, pDoorsxUser.Order.Id, pDoorsxUser.DoorStyle.Id, pDoorsxUser.Material.Id, pDoorsxUser.TopRail.Id, pDoorsxUser.BottomRail.Id, 
                pDoorsxUser.Preparation.Id, pDoorsxUser.Join.Id, pDoorsxUser.OutsideEdgeProfile.Id, 
                pDoorsxUser.InsideEdgeProfile.Id, pDoorsxUser.VerticalDivisions.Id, pDoorsxUser.HorizontalDivisions.Id, pDoorsxUser.HingeDirection.Id, 
                pDoorsxUser.HingePositions.Id, pDoorsxUser.isDrill, pDoorsxUser.Width, pDoorsxUser.Height, pDoorsxUser.IsOpeningMeasurement, pDoorsxUser.Quantity, pDoorsxUser.User.Id, 
                pDoorsxUser.Status.Id, pDoorsxUser.CreationDate.ToString("yyyyMMdd"), pDoorsxUser.CreatorUser, pDoorsxUser.ModificationDate.ToString("yyyyMMdd"),
                pDoorsxUser.ModificationUser, pDoorsxUser.Picture, pDoorsxUser.ProfilePicture);
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
            string sql = @"[spUpdateDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}'";
            sql = string.Format(sql, pDoorsxUser.Order.Id, pDoorsxUser.DoorStyle.Id, pDoorsxUser.Material.Id, pDoorsxUser.TopRail.Id, pDoorsxUser.BottomRail.Id,
                pDoorsxUser.Preparation.Id, pDoorsxUser.Join.Id, pDoorsxUser.OutsideEdgeProfile.Id,
                pDoorsxUser.InsideEdgeProfile.Id, pDoorsxUser.VerticalDivisions.Id, pDoorsxUser.HorizontalDivisions.Id, pDoorsxUser.HingeDirection.Id,
                pDoorsxUser.HingePositions.Id, pDoorsxUser.isDrill, pDoorsxUser.Width, pDoorsxUser.Height, pDoorsxUser.IsOpeningMeasurement, pDoorsxUser.Quantity, pDoorsxUser.User.Id,
                pDoorsxUser.Status.Id, pDoorsxUser.ModificationDate.ToString("yyyyMMdd"), pDoorsxUser.ModificationUser, pDoorsxUser.Picture, pDoorsxUser.ProfilePicture);
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
    }
}
