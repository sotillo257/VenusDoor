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
                pDoorsxOrder.DoorxUser = DoorUser;
                int Rail = 1;
                if (DoorUser.TopRail.Id == 3 || DoorUser.BottomRail.Id == 3 || DoorUser.DoorStyle.Id == 1009 || DoorUser.DoorStyle.Id == 1008)
                {
                    Rail = 2;
                }
                int panel = 5;
                if (DoorUser.Panel.Id == 2)
                {
                    panel = DoorUser.Panel.Id;
                }
                if (DoorUser.DoorStyle.Id == 1010)
                {
                    panel = 2;
                }
                lnUser _LNUser = new lnUser();
                User u = new User();
                u = _LNUser.GetUserById(pDoorsxOrder.User.Id);
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
                pDoorsxOrder.User = u;
                decimal result = (((((Width * Height) / 12m) / 12m) - 1.5m) * DoorPrice.AdditionalSFPrice) + DoorPrice.BasePrice;
                if ((DoorUser.DoorStyle.Id == 1010))
                {
                    result = result / 100m * 80m;
                }
                if (result < DoorPrice.BasePrice)
                {

                    result = DoorPrice.BasePrice * 2;
                    if (pDoorsxOrder.User.Descuento > 0)
                    {
                        decimal des = decimal.Parse(pDoorsxOrder.User.Descuento.ToString()) / 100m;
                        result = result - (des * result);
                    }
                    if (pDoorsxOrder.Descuento > 0)
                    {
                        decimal des = decimal.Parse(pDoorsxOrder.Descuento.ToString()) / 100m;
                        pDoorsxOrder.TotalDescuento = result * des;
                        result = result - (des * result);
                    }                    
                    pDoorsxOrder.ItemCost = result;
                    pDoorsxOrder.SubTotal = result * pDoorsxOrder.Quantity;
                }
                else
                {
                    result = result * 2;
                    if (pDoorsxOrder.User.Descuento > 0)
                    {
                        decimal des = decimal.Parse(pDoorsxOrder.User.Descuento.ToString()) / 100m;
                        pDoorsxOrder.TotalDescuento = result * des;
                        result = result - (des * result);
                    }
                    if (pDoorsxOrder.Descuento > 0)
                    {
                        decimal des = decimal.Parse(pDoorsxOrder.Descuento.ToString()) / 100m;
                        pDoorsxOrder.TotalDescuento = result * des;
                        result = result - (des * result);
                    }
                    pDoorsxOrder.ItemCost = result ;
                    pDoorsxOrder.SubTotal = result * pDoorsxOrder.Quantity;
                }               
                pDoorsxOrder.CreationDate = DateTime.Now;
                pDoorsxOrder.ModificationDate = DateTime.Now;
                pDoorsxOrder.CreatorUser = pDoorsxOrder.User.Id;
                pDoorsxOrder.ModificationUser = pDoorsxOrder.User.Id;
                pDoorsxOrder.ProfilePicture = DU.BuscarProfilePicture(DoorUser.OutsideEdgeProfile.Id, DoorUser.InsideEdgeProfile.Id, DoorUser.Panel.Id);
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
                lnUser _LNUser = new lnUser();
                User u = new User();
                u = _LNUser.GetUserById(Order.User.Id);
                DoorsxUser Dxu = DU.GetDoorsxUserById(Order.DoorxUser.Id);

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
                        Order.DoorxUser.Panel.Id = 5;
                    }
                    else if (Order.DoorxUser.DoorStyle.Id == 1003)
                    {
                        Order.DoorxUser.Panel.Id = 2;
                    }
                    if (Order.DoorxUser.Panel.Id == 2)
                    {
                        panel = Order.DoorxUser.Panel.Id;
                    }
                    if (Order.DoorxUser.DoorStyle.Id == 1010)
                    {
                        panel = 2;
                        Order.DoorxUser.Panel.Id = 3;
                    }
                    else
                    {
                        if (Order.DoorxUser.Panel.Id == 3)
                        {
                            Order.DoorxUser.Panel.Id = 5;
                        }
                    }
                    item.User = u;
                    DoorsPrices DoorPrice = dp.GetDoorsPricesById(0, panel, Order.DoorxUser.Material.Id, Rail);
                    decimal deciW = listDeci.Where(x => x.Id == item.DecimalsWidth.Id).FirstOrDefault().Value;
                    decimal deciH = listDeci.Where(x => x.Id == item.DecimalsHeight.Id).FirstOrDefault().Value;
                    decimal Width = item.Width + deciW;
                    decimal Height = item.Height + deciH;
                    decimal result = (((((Width * Height) / 12m) / 12m) - 1.5m) * DoorPrice.AdditionalSFPrice) + DoorPrice.BasePrice;
                    if ((Order.DoorxUser.DoorStyle.Id == 1010))
                     {
                        result = result / 100m * 80m;
                     }
                    if (result < DoorPrice.BasePrice)
                    {
                        result = (DoorPrice.BasePrice * 2);
                        if (item.User.Descuento > 0)
                        {
                            decimal des = decimal.Parse(item.User.Descuento.ToString())/ 100m;
                            item.TotalDescuento = result * des;
                            result = result - (des * result);
                        }
                        if (item.Descuento > 0)
                        {
                            decimal des = decimal.Parse(item.Descuento.ToString()) / 100m;
                            item.TotalDescuento = result * des;
                            result = result - (des * result);
                        }
                        else
                        {
                            if (Order.Descuento > 0)
                            {
                                decimal des = decimal.Parse(Order.Descuento.ToString()) / 100m;
                                item.Descuento = Order.Descuento;
                                item.TotalDescuento = result * des;
                                result = result - (des * result);
                            }
                        }
                        item.ItemCost = result;
                        item.SubTotal = result * item.Quantity;
                    }
                    else
                    {
                        result = result * 2;
                        if (item.User.Descuento > 0)
                        {
                            decimal des = decimal.Parse(item.User.Descuento.ToString()) / 100m;
                            item.TotalDescuento = result * des;
                            result = result - (des * result);
                        }
                        if (item.Descuento > 0)
                        {
                            decimal des = decimal.Parse(item.Descuento.ToString()) / 100m;
                            item.TotalDescuento = result * des;
                            result = result - (des * result);
                        }
                        else
                        {
                            if (Order.Descuento > 0)
                            {
                                decimal des = decimal.Parse(Order.Descuento.ToString()) / 100m;
                                item.Descuento = Order.Descuento;
                                item.TotalDescuento = result * des;
                                result = result - (des * result);
                            }
                        }
                       
                        item.ItemCost = result;
                        item.SubTotal = result * item.Quantity;
                    }
                    
                    if (Dxu.isDrill == true)
                    {
                        if(Order.DoorxUser.isDrill == false)
                        {
                            item.HingeDirection.Id = 1;
                        }
                    }
                    else
                    {
                        item.HingeDirection.Id = 3;
                    }
                    item.DoorxUser = Order.DoorxUser;
                    item.ModificationDate = DateTime.Now;
                    item.ModificationUser = item.User.Id;
                    item.ProfilePicture = DU.BuscarProfilePicture(Order.DoorxUser.OutsideEdgeProfile.Id, Order.DoorxUser.InsideEdgeProfile.Id, Order.DoorxUser.Panel.Id);
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
                lnUser _LNUser = new lnUser();
                Order.User = _LNUser.GetUserById(Order.User.Id);
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
                        Order.DoorxUser.Panel.Id = 5;
                    }
                    else if (Order.DoorxUser.DoorStyle.Id == 1003)
                    {
                        Order.DoorxUser.Panel.Id = 2;
                    }
                    if (Order.DoorxUser.Panel.Id == 2)
                    {
                        panel = Order.DoorxUser.Panel.Id;
                    }
                    if (Order.DoorxUser.DoorStyle.Id == 1010)
                    {
                        panel = 2;
                    }
                    else
                    {
                        if (Order.DoorxUser.Panel.Id == 3)
                        {
                        Order.DoorxUser.Panel.Id = 5;
                        }
                    }
                DoorsPrices DoorPrice = dp.GetDoorsPricesById(0, panel, Order.DoorxUser.Material.Id, Rail);
                    decimal deciW = listDeci.Where(x => x.Id == pDoorsOrder.DecimalsWidth.Id).FirstOrDefault().Value;
                    decimal deciH = listDeci.Where(x => x.Id == pDoorsOrder.DecimalsHeight.Id).FirstOrDefault().Value;
                    decimal Width = pDoorsOrder.Width + deciW;
                    decimal Height = pDoorsOrder.Height + deciH;
                    decimal result = (((((Width * Height) / 12m) / 12m) - 1.5m) * DoorPrice.AdditionalSFPrice) + DoorPrice.BasePrice;
                    if ((Order.DoorxUser.DoorStyle.Id == 1010))
                    {
                        result = result / 100m * 80m;
                    }

                if (result < DoorPrice.BasePrice)
                    {
                        result = DoorPrice.BasePrice * 2;
                        if (Order.User.Descuento > 0)
                        {
                            decimal des = decimal.Parse(Order.User.Descuento.ToString()) / 100m;
                            pDoorsOrder.TotalDescuento = result * des;
                            result = result - (des * result);
                        }
                        if (pDoorsOrder.Descuento > 0)
                        {
                            decimal des = decimal.Parse(pDoorsOrder.Descuento.ToString()) / 100m;
                        pDoorsOrder.TotalDescuento = result * des;
                            result = result - (des * result);
                            }
                            else
                            {
                                if (Order.Descuento > 0)
                                {
                                    decimal des = decimal.Parse(Order.Descuento.ToString()) / 100m;
                                pDoorsOrder.Descuento = Order.Descuento;
                                pDoorsOrder.TotalDescuento = result * des;
                                    result = result - (des * result);
                                }
                            }
                        pDoorsOrder.ItemCost = result;
                        pDoorsOrder.SubTotal = result * pDoorsOrder.Quantity;
                     }
                    else
                    {
                    result = result * 2;
                    if (Order.User.Descuento > 0)
                    {
                        decimal des = decimal.Parse(Order.User.Descuento.ToString()) / 100m;
                        pDoorsOrder.TotalDescuento = result * des;
                        result = result - (des * result);
                    }
                    if (pDoorsOrder.Descuento > 0)
                    {
                        decimal des = decimal.Parse(pDoorsOrder.Descuento.ToString()) / 100m;
                        pDoorsOrder.TotalDescuento = result * des;
                        result = result - (des * result);
                    }
                    else
                    {
                        if (Order.Descuento > 0)
                        {
                            decimal des = decimal.Parse(Order.Descuento.ToString()) / 100m;
                            pDoorsOrder.Descuento = Order.Descuento;
                            pDoorsOrder.TotalDescuento = result * des;
                            result = result - (des * result);
                        }
                    }
                    pDoorsOrder.ItemCost = result;
                    pDoorsOrder.SubTotal = result * pDoorsOrder.Quantity;
                    }
                    
                pDoorsOrder.DoorxUser = Order.DoorxUser;
                pDoorsOrder.ModificationDate = DateTime.Now;
                pDoorsOrder.ModificationUser = pIdUser;
                pDoorsOrder.ProfilePicture = DU.BuscarProfilePicture(Order.DoorxUser.OutsideEdgeProfile.Id, Order.DoorxUser.InsideEdgeProfile.Id, Order.DoorxUser.Panel.Id);
                pDoorsOrder.Picture = DU.BuscarDoorPicture(pDoorsOrder);
                int retorno = _AD.UpdateDoorsxOrder(pDoorsOrder);

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
