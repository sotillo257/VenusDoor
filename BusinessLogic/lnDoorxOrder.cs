using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoorxOrder
    {
        DataAccess.adDoorxOrder _AD = new DataAccess.adDoorxOrder();
        public int InsertDoorsxOrder(DoorxOrder pDoorsxOrder)
        {
            try
            {
                lnDecimals deci = new lnDecimals();
                List<Decimals> listDeci = deci.GetAllDecimals();
                lnDoorsPrices dp = new lnDoorsPrices();
                lnDoorsxUser DU = new lnDoorsxUser();
                lnOrder _LNOrder = new lnOrder();
                Order item = _LNOrder.GetOrderByUser(pDoorsxOrder.User.Id).Where(x => x.Status.Id == 4).FirstOrDefault();
                DoorsxUser DoorUser = DU.GetAllDoorsxUser().Where(x => x.Order.Id == item.Id).FirstOrDefault();
                int Rail = 1;
                if (DoorUser.TopRail.Id == 3 || DoorUser.BottomRail.Id == 3 || DoorUser.DoorStyle.Id == 1009 || DoorUser.DoorStyle.Id == 1008)
                {
                    Rail = 2;
                }
                int panel = 5;
                if (pDoorsxOrder.Panel.Id == 2)
                {
                    panel = pDoorsxOrder.Panel.Id;
                }
                if (DoorUser.DoorStyle.Id == 1010)
                {
                    panel = 2;
                }
               
                DoorsPrices DoorPrice = dp.GetDoorsPricesById(0, panel, DoorUser.Material.Id, Rail);
                decimal deciW = listDeci.Where(x => x.Id == pDoorsxOrder.DecimalsWidth.Id).FirstOrDefault().Value;
                decimal deciH = listDeci.Where(x => x.Id == pDoorsxOrder.DecimalsHeight.Id).FirstOrDefault().Value;
                decimal Width = pDoorsxOrder.Width + deciW;
                decimal Height = pDoorsxOrder.Height + deciH;
                decimal a = 1;
                decimal b = 1;
                decimal aux = 1;
                while (!(aux == deciW))
                    {
                    aux = a / b;
                    if (aux < deciW)
                    {
                        a++;
                    }
                    else if (aux > deciW)
                    {
                        a--;
                        b++;
                    }
                }
                string fracc = a.ToString() + "/" + b.ToString();

                decimal result = (((((Width * Height) / 12m) / 12m) - 1.5m) * DoorPrice.AdditionalSFPrice) + DoorPrice.BasePrice;
                if (result < DoorPrice.BasePrice)
                {
                    result = DoorPrice.BasePrice * 2;
                    pDoorsxOrder.ItemCost = result;
                    pDoorsxOrder.SubTotal = result * pDoorsxOrder.Quantity;
                }
                else
                {
                    result = result * 2;
                    pDoorsxOrder.ItemCost = result ;
                    pDoorsxOrder.SubTotal = result * pDoorsxOrder.Quantity;
                }
                pDoorsxOrder.Descuento = 0;
                pDoorsxOrder.DoorxUser = DoorUser;
                pDoorsxOrder.CreationDate = DateTime.Now;
                pDoorsxOrder.ModificationDate = DateTime.Now;
                pDoorsxOrder.CreatorUser = pDoorsxOrder.User.Id;
                pDoorsxOrder.ModificationUser = pDoorsxOrder.User.Id;
                pDoorsxOrder.ProfilePicture = DU.BuscarProfilePicture(DoorUser.OutsideEdgeProfile.Id, DoorUser.InsideEdgeProfile.Id, pDoorsxOrder.Panel.Id);
                pDoorsxOrder.Picture = DU.BuscarDoorPicture(pDoorsxOrder);
               int retorno = _AD.InsertDoorsxOrder(pDoorsxOrder);
                item.SubTotal = item.SubTotal + pDoorsxOrder.SubTotal;
                item.Tax = 0.0825m * item.SubTotal;
                item.Total = item.Tax + item.SubTotal;
                item.Quantity = item.Quantity + pDoorsxOrder.Quantity;
                _LNOrder.UpdateOrder(item);
                return retorno;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorsxOrder(Order Order)
        {
            try
            {
                lnDecimals deci = new lnDecimals();
                List<Decimals> listDeci = deci.GetAllDecimals();
                lnDoorsPrices dp = new lnDoorsPrices();
                List<DoorxOrder> listDoorOrders = GetAllDoorxOrderByDoorxUser(Order.DoorxUser.Id);
                lnDoorsxUser DU = new lnDoorsxUser();
                Order.SubTotal = 0;
                Order.Quantity = 0;
                lnOrder _LNOrder = new lnOrder();
                foreach (DoorxOrder item in listDoorOrders)
                {
                    int Rail = 1;
                    if (Order.DoorxUser.TopRail.Id == 3 || Order.DoorxUser.BottomRail.Id == 3 || Order.DoorxUser.DoorStyle.Id == 1009 || Order.DoorxUser.DoorStyle.Id == 1008)
                    {
                        Rail = 2;
                    }
                    int panel = 5;
                    if (Order.DoorxUser.DoorStyle.Id == 1002)
                    {
                        item.Panel.Id = 5;
                    }
                    else if (Order.DoorxUser.DoorStyle.Id == 1003)
                    {
                        item.Panel.Id = 2;
                    }
                    if (item.Panel.Id == 2)
                    {
                        panel = item.Panel.Id;
                    }
                    if (Order.DoorxUser.DoorStyle.Id == 1010)
                    {
                        panel = 2;
                    }
                    DoorsPrices DoorPrice = dp.GetDoorsPricesById(0, panel, Order.DoorxUser.Material.Id, Rail);
                    decimal deciW = listDeci.Where(x => x.Id == item.DecimalsWidth.Id).FirstOrDefault().Value;
                    decimal deciH = listDeci.Where(x => x.Id == item.DecimalsHeight.Id).FirstOrDefault().Value;
                    decimal Width = item.Width + deciW;
                    decimal Height = item.Height + deciH;
                    decimal result = (((((Width * Height) / 12m) / 12m) - 1.5m) * DoorPrice.AdditionalSFPrice) + DoorPrice.BasePrice;
                    decimal desc = 1;
                    if (Order.Descuento > 0)
                    {
                        desc = Order.Descuento / 100;
                    }
                    
                    if (result < DoorPrice.BasePrice)
                    {
                        result = DoorPrice.BasePrice - ((DoorPrice.BasePrice * 2) * desc);
                        item.TotalDescuento = (DoorPrice.BasePrice * 2) * desc; 
                        item.ItemCost = result;
                        item.SubTotal = result * item.Quantity;
                    }
                    else
                    {
                        result = result - ((result * 2) * desc);
                        item.TotalDescuento = (result * 2) * desc;
                        item.ItemCost = result;
                        item.SubTotal = result * item.Quantity;
                    }

                    item.Descuento = Order.Descuento;
                    item.DoorxUser = Order.DoorxUser;
                    item.ModificationDate = DateTime.Now;
                    item.ModificationUser = item.User.Id;
                    item.ProfilePicture = DU.BuscarProfilePicture(Order.DoorxUser.OutsideEdgeProfile.Id, Order.DoorxUser.InsideEdgeProfile.Id, item.Panel.Id);
                    item.Picture = DU.BuscarDoorPicture(item);
                    int retorno = _AD.UpdateDoorsxOrder(item);                   
                    Order.SubTotal = Order.SubTotal + item.SubTotal;
                    Order.Tax = 0.0825m * Order.SubTotal;
                    Order.Total = Order.Tax + Order.SubTotal;
                    Order.Quantity = Order.Quantity + item.Quantity;
                    _LNOrder.UpdateOrder(Order);
                }

                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public List<DoorxOrder> GetAllDoorxOrderByDoorxUser(int IdDoorUser)
        {
            try
            {
                return _AD.GetAllDoorxOrderByDoorxUser(IdDoorUser);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DoorxOrder GetDoorsxOrderById(int pId)
        {
            try
            {
                return _AD.GetDoorxOrderById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorsxOrder(int pId)
        {
            try
            {
                _AD.DeleteDoorsxOrder(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDesuentoOrder(int pIdOrder, int pDescuento, int pIdUser) {
            try
            {
                lnOrder _LNOrder = new lnOrder();
                Order item = _LNOrder.GetOrderById(pIdOrder);
                item.Descuento = pDescuento;
                item.ModificationUser = pIdUser;
                item.ModificationDate = DateTime.Now;
                _LNOrder.UpdateOrder(item);

                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorxOrder(int pIdOrder, DoorxOrder pDoorsOrder, int pIdUser) {
            try
            {
                lnDecimals deci = new lnDecimals();
                List<Decimals> listDeci = deci.GetAllDecimals();
                lnDoorsPrices dp = new lnDoorsPrices();               
                lnDoorsxUser DU = new lnDoorsxUser();
                lnOrder _LNOrder = new lnOrder();
                Order Order = _LNOrder.GetOrderById(pIdOrder);
                Order.DoorxUser = DU.GetAllDoorsxUser().Where(x => x.Order.Id == Order.Id).FirstOrDefault();
                Order.SubTotal = 0;
                Order.Quantity = 0;
                int Rail = 1;
                    if (Order.DoorxUser.TopRail.Id == 3 || Order.DoorxUser.BottomRail.Id == 3 || Order.DoorxUser.DoorStyle.Id == 1009 || Order.DoorxUser.DoorStyle.Id == 1008)
                    {
                        Rail = 2;
                    }
                    int panel = 5;
                    if (Order.DoorxUser.DoorStyle.Id == 1002)
                    {
                        Order.DoorxUser.DoorsxOrder.FirstOrDefault().Panel.Id = 5;
                    }
                    else if (Order.DoorxUser.DoorStyle.Id == 1003)
                    {
                    Order.DoorxUser.DoorsxOrder.FirstOrDefault().Panel.Id = 2;
                    }
                    if (Order.DoorxUser.DoorsxOrder.FirstOrDefault().Panel.Id == 2)
                    {
                        panel = Order.DoorxUser.DoorsxOrder.FirstOrDefault().Panel.Id;
                    }
                    if (Order.DoorxUser.DoorStyle.Id == 1010)
                    {
                        panel = 2;
                    }
                    DoorsPrices DoorPrice = dp.GetDoorsPricesById(0, panel, Order.DoorxUser.Material.Id, Rail);
                    decimal deciW = listDeci.Where(x => x.Id == Order.DoorxUser.DoorsxOrder.FirstOrDefault().DecimalsWidth.Id).FirstOrDefault().Value;
                    decimal deciH = listDeci.Where(x => x.Id == Order.DoorxUser.DoorsxOrder.FirstOrDefault().DecimalsHeight.Id).FirstOrDefault().Value;
                    decimal Width = Order.DoorxUser.DoorsxOrder.FirstOrDefault().Width + deciW;
                    decimal Height = Order.DoorxUser.DoorsxOrder.FirstOrDefault().Height + deciH;
                    decimal result = (((((Width * Height) / 12m) / 12m) - 1.5m) * DoorPrice.AdditionalSFPrice) + DoorPrice.BasePrice;
                    decimal desc = 1;
                    if (Order.Descuento > 0)
                    {
                        desc = Order.Descuento / 100;
                    }

                    if (result < DoorPrice.BasePrice)
                    {
                        result = DoorPrice.BasePrice - ((DoorPrice.BasePrice * 2) * desc);
                    Order.DoorxUser.DoorsxOrder.FirstOrDefault().TotalDescuento = (DoorPrice.BasePrice * 2) * desc;
                    Order.DoorxUser.DoorsxOrder.FirstOrDefault().ItemCost = result;
                    Order.DoorxUser.DoorsxOrder.FirstOrDefault().SubTotal = result * Order.DoorxUser.DoorsxOrder.FirstOrDefault().Quantity;
                    }
                    else
                    {
                        result = result - ((result * 2) * desc);
                    Order.DoorxUser.DoorsxOrder.FirstOrDefault().TotalDescuento = (result * 2) * desc;
                    Order.DoorxUser.DoorsxOrder.FirstOrDefault().ItemCost = result;
                    Order.DoorxUser.DoorsxOrder.FirstOrDefault().SubTotal = result * Order.DoorxUser.DoorsxOrder.FirstOrDefault().Quantity;
                    }

                Order.DoorxUser.DoorsxOrder.FirstOrDefault().Descuento = Order.Descuento;
                Order.DoorxUser.DoorsxOrder.FirstOrDefault().DoorxUser = Order.DoorxUser;
                Order.DoorxUser.DoorsxOrder.FirstOrDefault().ModificationDate = DateTime.Now;
                Order.DoorxUser.DoorsxOrder.FirstOrDefault().ModificationUser = pIdUser;
                Order.DoorxUser.DoorsxOrder.FirstOrDefault().ProfilePicture = DU.BuscarProfilePicture(Order.DoorxUser.OutsideEdgeProfile.Id, Order.DoorxUser.InsideEdgeProfile.Id, item.Panel.Id);
                Order.DoorxUser.DoorsxOrder.FirstOrDefault().Picture = DU.BuscarDoorPicture(Order.DoorxUser.DoorsxOrder.FirstOrDefault());
                int retorno = _AD.UpdateDoorsxOrder(Order.DoorxUser.DoorsxOrder.FirstOrDefault());

                 decimal subTotal = _AD.GetTotalDoorxOrderByDoorxUser(Order.DoorxUser.Id);
                int cantidad = _AD.GetAllDoorxOrderByDoorxUser(Order.DoorxUser.Id).Sum(x => x.Quantity);
                if (subTotal > 0 )
                {
                    Order.SubTotal = subTotal;
                    Order.Tax = 0.0825m * Order.SubTotal;
                    Order.Total = Order.Tax + Order.SubTotal;
                    Order.Quantity = cantidad;
                    Order.ModificationDate = DateTime.Now;
                    Order.ModificationUser = pIdUser;
                    _LNOrder.UpdateOrder(Order);
                }
                    
               
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }

        }

    }

}
