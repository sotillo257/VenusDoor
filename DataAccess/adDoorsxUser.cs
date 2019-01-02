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
                            IdUser = int.Parse(item["IdUser"].ToString()),
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
                            IdUser = int.Parse(item["IdUser"].ToString()),
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
                return doorxu;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoorsxUser(DoorsxUser pDoorsxUser)
        {
            string sql = @"[spInsertDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{8}', '{9}', '{10}', '{11}', 
            '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}, '{26}', '{27}'";
            sql = string.Format(sql, pDoorsxUser.IdOrder, pDoorsxUser.IdDoorStyle, pDoorsxUser.IdMaterial, pDoorsxUser.IdTopRail,pDoorsxUser.IdBottomRail, 
                pDoorsxUser.IdPreparation, pDoorsxUser.IdJoin, pDoorsxUser.IdStileWidth, pDoorsxUser.IdRailWidth, pDoorsxUser.IdOutsideEdgeProfile, 
                pDoorsxUser.IdInsideEdgeProfile, pDoorsxUser.IdVerticalDivisions, pDoorsxUser.IdHorizontalDivisions, pDoorsxUser.IdHingeDirection, 
                pDoorsxUser.IdHingePositions, pDoorsxUser.isDrill, pDoorsxUser.Width, pDoorsxUser.Height, pDoorsxUser.IsOpeningMeasurement, pDoorsxUser.Quantity, pDoorsxUser.IdUser, 
                pDoorsxUser.IdStatus, pDoorsxUser.CreationDate.ToString("yyyyMMdd"), pDoorsxUser.CreatorUser, pDoorsxUser.ModificationDate.ToString("yyyyMMdd"),
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
            string sql = @"[spUpdateDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{8}', '{9}', '{10}', '{11}', 
            '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}'";
            sql = string.Format(sql, pDoorsxUser.IdOrder, pDoorsxUser.IdDoorStyle, pDoorsxUser.IdMaterial, pDoorsxUser.IdTopRail, pDoorsxUser.IdBottomRail,
                pDoorsxUser.IdPreparation, pDoorsxUser.IdJoin, pDoorsxUser.IdStileWidth, pDoorsxUser.IdRailWidth, pDoorsxUser.IdOutsideEdgeProfile,
                pDoorsxUser.IdInsideEdgeProfile, pDoorsxUser.IdVerticalDivisions, pDoorsxUser.IdHorizontalDivisions, pDoorsxUser.IdHingeDirection,
                pDoorsxUser.IdHingePositions, pDoorsxUser.isDrill, pDoorsxUser.Width, pDoorsxUser.Height, pDoorsxUser.IsOpeningMeasurement, pDoorsxUser.Quantity, pDoorsxUser.IdUser,
                pDoorsxUser.IdStatus, pDoorsxUser.ModificationDate.ToString("yyyyMMdd"), pDoorsxUser.ModificationUser, pDoorsxUser.Picture, pDoorsxUser.ProfilePicture);
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
