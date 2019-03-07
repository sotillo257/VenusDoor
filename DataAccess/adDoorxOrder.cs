using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Model;

namespace DataAccess
{
    public class adDoorxOrder : Connection
    {
        public List<DoorxOrder> GetAllDoorxOrder()
        {
            List<DoorxOrder> doorxu = new List<DoorxOrder>();
            string sql = @"[spGetAllDoorxOrder]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorxOrder", sql, _CN);
                if (ds.Tables["DoorxOrder"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorxOrder"].Rows)
                    {
                        doorxu.Add(new DoorxOrder()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorxUser = new DoorsxUser() { Id = int.Parse(item["IdDoorsxUser"].ToString()) },                         
                            Width = decimal.Parse(item["Width"].ToString()),
                            DecimalsWidth = new Decimals() { Id = int.Parse(item["IdDecimalsWidth"].ToString()), Description = item["DescriptDW"].ToString(), Value = decimal.Parse(item["ValueDW"].ToString()) },
                            Height = decimal.Parse(item["Height"].ToString()),
                            DecimalsHeight = new Decimals() { Id = int.Parse(item["IdDecimalsHeight"].ToString()), Description = item["DescriptDH"].ToString(), Value = decimal.Parse(item["ValueDH"].ToString()) },                           
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
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()), Description = item["DescripDoorOption"].ToString() }                         
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

        public int InsertDoorsxOrder(DoorxOrder pDoorsxOrder)
        {
            decimal total = Convert.ToDecimal(pDoorsxOrder.ItemCost);
            decimal subto = Convert.ToDecimal(pDoorsxOrder.SubTotal);
            string sql = @"[spInsertDoorsxUser] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}', '{21}', '{22}', '{23}', '{24}', '{25}', '{26}', '{27}', '{28}', '{29}', '{30}', '{31}', '{32}', '{33}', '{34}', '{35}'";
            sql = string.Format(sql, pDoorsxOrder.DoorxUser.Id,
                pDoorsxOrder.Width.ToString().Replace(',', '.'), pDoorsxOrder.DecimalsWidth.Id, pDoorsxOrder.Height.ToString().Replace(',', '.'),
                pDoorsxOrder.DecimalsHeight.Id, pDoorsxOrder.Quantity, total.ToString().Replace(',', '.'), subto.ToString().Replace(',', '.'),
                pDoorsxOrder.User.Id, pDoorsxOrder.Status.Id, pDoorsxOrder.CreationDate.ToString("yyyyMMdd HH:mm:ss"), pDoorsxOrder.CreatorUser, 
                pDoorsxOrder.ModificationDate.ToString("yyyyMMdd HH:mm:ss"), pDoorsxOrder.ModificationUser, pDoorsxOrder.Picture, pDoorsxOrder.ProfilePicture, 
                pDoorsxOrder.Panel.Id, pDoorsxOrder.DoorType.Id, pDoorsxOrder.DoorOption.Id);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void DeleteDoorsxOrder(int pId)
        {
            string sql = @"[spDeleteDoorsxOrder] '{0}'";
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
