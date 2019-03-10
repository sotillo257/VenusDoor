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

    }

}
