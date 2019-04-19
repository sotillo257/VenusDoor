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
                        int val = 0;
                        if (int.TryParse(item["Descuentos"].ToString(), out val))
                        {
                            val = int.Parse(item["Descuentos"].ToString());
                        }
                        decimal valu = 0;
                        if (decimal.TryParse(item["TotalDescuento"].ToString(), out valu))
                        {
                            valu = decimal.Parse(item["TotalDescuento"].ToString());
                        }
                        doorxu.Add(new DoorxOrder()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorxUser = new DoorsxUser() { Id = int.Parse(item["IdDoorxUser"].ToString()) },
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
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()), Description = item["DescripDoorOption"].ToString() },
                            Descuento = val,
                            TotalDescuento = valu,
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position1 = item["HP1"].ToString(), Position2 = item["HP2"].ToString(), Position3 = item["HP3"].ToString(), Position4 = item["HP4"].ToString(), Position5 = item["HP5"].ToString(), },
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

        public List<DoorxOrder> GetAllDoorxOrderByDoorxUser(int IdOrder)
        {
            List<DoorxOrder> doorxu = new List<DoorxOrder>();
            string sql = @"[spGetAllDoorsxOrderDoorxUser] '{0}'";
            sql = string.Format(sql, IdOrder);
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorxOrder", sql, _CN);
                if (ds.Tables["DoorxOrder"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorxOrder"].Rows)
                    {
                        int val = 0;
                        if (int.TryParse(item["Descuentos"].ToString(), out val))
                        {
                            val = int.Parse(item["Descuentos"].ToString());
                        }
                        decimal valu = 0;
                        if (decimal.TryParse(item["TotalDescuento"].ToString(), out valu))
                        {
                            valu = decimal.Parse(item["TotalDescuento"].ToString());
                        }
                        doorxu.Add(new DoorxOrder()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorxUser = new DoorsxUser() { Id = int.Parse(item["IdDoorxUser"].ToString()) },
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
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()), Description = item["DescripDoorOption"].ToString() },
                            Descuento = val,
                            TotalDescuento = valu,
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position1 = item["HP1"].ToString(), Position2 = item["HP2"].ToString(), Position3 = item["HP3"].ToString(), Position4 = item["HP4"].ToString(), Position5 = item["HP5"].ToString(), },
                        });
                    }
                }
                return doorxu;
            }
            catch (Exception erro)
            {
                throw;
            }

        }

        public DoorxOrder GetDoorxOrderById(int Id)
        {
            DoorxOrder doorxu = new DoorxOrder();
            string sql = @"[spGetDoorsxOrder] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorsxOrder", sql, _CN);
                if (ds.Tables["DoorsxOrder"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorsxOrder"].Rows)
                    {
                        int val = 0;
                        if (int.TryParse(item["Descuentos"].ToString(), out val))
                        {
                            val = int.Parse(item["Descuentos"].ToString());
                        }
                        decimal valu = 0;
                        if (decimal.TryParse(item["TotalDescuento"].ToString(), out valu))
                        {
                            valu = decimal.Parse(item["TotalDescuento"].ToString());
                        }
                        doorxu = new DoorxOrder()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            DoorxUser = new DoorsxUser() { Id = int.Parse(item["IdDoorxUser"].ToString()) },
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
                            DoorType = new DoorType() { Id = int.Parse(item["IdDoorType"].ToString()), Description = item["DescripDoorType"].ToString() },
                            DoorOption = new DoorOption() { Id = int.Parse(item["IdDoorOption"].ToString()), Description = item["DescripDoorOption"].ToString() },
                            Descuento = val,
                            TotalDescuento = valu,
                            isDrill = bool.Parse(item["isDrill"].ToString()),
                            HingeDirection = new HingeDirection() { Id = int.Parse(item["IdHingeDirection"].ToString()), Direction = item["HingerDirection"].ToString(), },
                            HingePositions = new HingePositions() { Id = int.Parse(item["IdHingePositions"].ToString()), Position1 = item["HP1"].ToString(), Position2 = item["HP2"].ToString(), Position3 = item["HP3"].ToString(), Position4 = item["HP4"].ToString(), Position5 = item["HP5"].ToString(), },
                        };
                    }
                }
                return doorxu;
            }
            catch (Exception err)
            {
                throw;
            }

        }

        public int InsertDoorsxOrder(DoorxOrder pDoorsxOrder)
        {
            decimal total = Convert.ToDecimal(pDoorsxOrder.ItemCost);
            decimal subto = Convert.ToDecimal(pDoorsxOrder.SubTotal);
            string sql = @"[spInsertDoorsxOrder]  '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}'";
            sql = string.Format(sql,
                pDoorsxOrder.DoorxUser.Id,
                pDoorsxOrder.Width.ToString().Replace(',', '.'), 
                pDoorsxOrder.DecimalsWidth.Id, 
                pDoorsxOrder.Height.ToString().Replace(',', '.'),
                pDoorsxOrder.DecimalsHeight.Id, 
                pDoorsxOrder.Quantity, 
                total.ToString().Replace(',', '.'), 
                subto.ToString().Replace(',', '.'),
                pDoorsxOrder.User.Id, 
                pDoorsxOrder.Status.Id, 
                pDoorsxOrder.CreatorUser, 
                pDoorsxOrder.ModificationUser, 
                pDoorsxOrder.Picture,
                pDoorsxOrder.ProfilePicture,
                pDoorsxOrder.DoorType.Id,
                pDoorsxOrder.DoorOption.Id,
                (pDoorsxOrder.isDrill == true) ? 1 : 0,
                pDoorsxOrder.HingeDirection.Id,
                pDoorsxOrder.HingePositions.Id);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public int UpdateDoorsxOrder(DoorxOrder pDoorsxOrder)
        {
            decimal total = Convert.ToDecimal(pDoorsxOrder.ItemCost);
            decimal subto = Convert.ToDecimal(pDoorsxOrder.SubTotal);
            string sql = @"[spUpdateDoorsxOrder]  '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}', '{16}', '{17}', '{18}', '{19}', '{20}'";
            sql = string.Format(sql,
                pDoorsxOrder.Id,
                pDoorsxOrder.DoorxUser.Id,
                pDoorsxOrder.Width.ToString().Replace(',', '.'),
                pDoorsxOrder.DecimalsWidth.Id,
                pDoorsxOrder.Height.ToString().Replace(',', '.'),
                pDoorsxOrder.DecimalsHeight.Id,
                pDoorsxOrder.Quantity,
                total.ToString().Replace(',', '.'),
                subto.ToString().Replace(',', '.'),
                pDoorsxOrder.User.Id,
                pDoorsxOrder.Status.Id,
                pDoorsxOrder.ModificationUser,
                pDoorsxOrder.Picture,
                pDoorsxOrder.ProfilePicture,
                pDoorsxOrder.DoorType.Id,
                pDoorsxOrder.DoorOption.Id,
                (pDoorsxOrder.isDrill == true) ? 1 : 0,
                pDoorsxOrder.HingeDirection.Id,
                pDoorsxOrder.HingePositions.Id,
                pDoorsxOrder.Descuento,
                pDoorsxOrder.TotalDescuento.ToString().Replace(',', '.'));
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

        public decimal GetTotalDoorxOrderByDoorxUser(int Id)
        {
            DoorxOrder doorxu = new DoorxOrder();
            string sql = @"[spGetTotalDoorOrderxDoorUser] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorsxOrder", sql, _CN);
                if (ds.Tables["DoorsxOrder"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorsxOrder"].Rows)
                    {
                        return decimal.Parse(item["Total"].ToString());
                           
                    }
                }
                return 0;
            }
            catch (Exception err)
            {
                return 0;
            }

        }


    }
}
