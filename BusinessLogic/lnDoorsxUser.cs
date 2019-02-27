using System;
using System.Collections.Generic;
using System.Linq;
using Model;
using System.IO;
using ExcelDataReader;
using System.Data;

namespace BusinessLogic
{
    public class lnDoorsxUser
    {
        DataAccess.adDoorsxUser _AD = new DataAccess.adDoorsxUser();

        public object ExcelReaderFactory { get; private set; }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de DoorsxUser.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorsxUser> GetAllDoorsxUser()
        {
            try
            {
                return _AD.GetAllDoorsxUser();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna DoorsxUser por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorsxUser GetDoorsxUserById(int pId)
        {
            try
            {
                return _AD.GetDoorsxUserById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorsxUser(DoorsxUser pDoorsxUser)
        {
            try
            {
                return _AD.InsertDoorsxUser(pDoorsxUser);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorsxUser(DoorsxUser pDoorsxUser)
        {
            try
            {
                _AD.UpdateDoorsxUser(pDoorsxUser);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorsxUser(int pId)
        {
            try
            {
                _AD.DeleteDoorsxUser(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteAllDoorsxUserByOrder(int pId)
        {
            try
            {
                _AD.DeleteAllDoorsxUserByOrder(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UploadExcel(IExcelDataReader reader, int CodUsuario) { 
            try
            {
                List<DoorsxUser> door = new List<DoorsxUser>();
                reader.Read();
                while (reader.Read())
                {
                    if (reader[0].ToString() != "Select")
                    {
                        door.Add(new DoorsxUser()
                        {
                            DoorStyle = new DoorStyle() { Id = 0, Description = reader[0].ToString() },
                            Material = new Material() { Id = 0, Description = reader[1].ToString() },
                            DoorOption = new DoorOption() { Id = 0, Description = reader[2].ToString() },
                            isOverlay = (reader[3].ToString() == "Insert Door Type") ? false : true,
                            TopRail = new TopRail() { Id = 0, Description = reader[4].ToString() },
                            BottomRail = new BottomRail() { Id = 0, Description = reader[5].ToString() },
                            Panel = new Panel() { Id = 0, Description = reader[6].ToString() },
                            PanelMaterial = new PanelMaterial() { Id = 0, Description = reader[7].ToString() },
                            Preparation = new Preparation() { Id = 0, Description = reader[8].ToString() },
                            Join = new Join() { Id = 0, Description = reader[9].ToString() },
                            OutsideEdgeProfile = new OutsideEdgeProfile() { Id = 0, Description = reader[10].ToString() },
                            InsideEdgeProfile = new InsideEdgeProfile() { Id = 0, Description = reader[11].ToString() },
                            VerticalDivisions = new VerticalDivisions() { Id = 0, Quantity = int.Parse(reader[12].ToString()), },
                            HorizontalDivisions = new HorizontalDivisions() { Id = 0, Quantity = int.Parse(reader[13].ToString()), },
                            Width = decimal.Parse(reader[14].ToString()),
                            Height = decimal.Parse(reader[15].ToString()),
                            isDrill = (reader[16].ToString() == "Drill") ? true : false,
                            HingeDirection = new HingeDirection() { Id = 0, Direction = reader[17].ToString(), },
                            IsOpeningMeasurement = (reader[18].ToString() == "Opening") ? true : false,
                            DoorType = new DoorType() { Id = 0, Description = reader[19].ToString(), },
                            isFingerPull = (reader[20].ToString() == "Yes") ? true : false,
                            Quantity = int.Parse(reader[21].ToString()),
                            Status = new Status() { Id = 1 },
                            CreationDate = DateTime.Now,
                            ModificationDate = DateTime.Now,
                            CreatorUser = CodUsuario,
                            ModificationUser = CodUsuario,
                            Picture = "",
                            ProfilePicture = "",
                            User = new User() { Id = CodUsuario }

                        });
                    }
                    else
                    {
                        break;
                    }

                }

                foreach (var item in door)
                {
                    BusinessLogic.lnDoorStyle _LN = new BusinessLogic.lnDoorStyle();
                    var _listDoorStyle = _LN.GetAllDoorStyle().Where(x => x.Description.Trim() == item.DoorStyle.Description.Trim()).FirstOrDefault();
                    if (_listDoorStyle != null)
                    {
                        item.DoorStyle.Id = _listDoorStyle.Id;
                    }

                    BusinessLogic.lnMaterial _LNMaterial = new BusinessLogic.lnMaterial();
                    var _listMateriale = _LNMaterial.GetAllMaterial().Where(x => x.Description.Trim() == item.Material.Description.Trim()).FirstOrDefault();
                    if (_listMateriale != null)
                    {
                        item.Material.Id = _listMateriale.Id;
                    }

                    BusinessLogic.lnDoorOption _LNDoorOption = new BusinessLogic.lnDoorOption();
                    var _listDoorOption = _LNDoorOption.GetAllDoorOption().Where(x => x.Description.Trim() == item.DoorOption.Description.Trim()).FirstOrDefault();
                    if (_listDoorOption != null)
                    {
                        item.DoorOption.Id = _listDoorOption.Id;
                    }
                    BusinessLogic.lnTopRail _LNTopRail = new BusinessLogic.lnTopRail();
                    var _listTopRail = _LNTopRail.GetAllTopRail().Where(x => x.Description.Trim() == item.TopRail.Description.Trim().Replace(',', '.')).FirstOrDefault();
                    if (_listTopRail != null)
                    {
                        item.TopRail.Id = _listTopRail.Id;
                    }
                    BusinessLogic.lnBottomRail _LNBottomRail = new BusinessLogic.lnBottomRail();
                    var _listBottomRail = _LNBottomRail.GetAllBottomRail().Where(x => x.Description.Trim() == item.BottomRail.Description.Trim().Replace(',', '.')).FirstOrDefault();
                    if (_listBottomRail != null)
                    {
                        item.BottomRail.Id = _listBottomRail.Id;
                    }
                    BusinessLogic.lnPanel _LNPanel = new BusinessLogic.lnPanel();
                    var _listPanel = _LNPanel.GetAllPanel().Where(x => x.Description.Trim() == item.Panel.Description.Trim()).FirstOrDefault();
                    if (_listPanel != null)
                    {
                        item.Panel.Id = _listPanel.Id;
                    }
                    BusinessLogic.lnPanelMaterial _LNPanelMaterial = new BusinessLogic.lnPanelMaterial();
                    var _listPanelMaterial = _LNPanelMaterial.GetAllPanelMaterial().Where(x => x.Description.Trim() == item.PanelMaterial.Description.Trim()).FirstOrDefault();
                    if (_listPanelMaterial != null)
                    {
                        item.PanelMaterial.Id = _listPanelMaterial.Id;
                    }
                    BusinessLogic.lnPreparation _LNPreparation = new BusinessLogic.lnPreparation();
                    var _listPreparation = _LNPreparation.GetAllPreparation().Where(x => x.Description.Trim() == item.Preparation.Description.Trim()).FirstOrDefault();
                    if (_listPreparation != null)
                    {
                        item.Preparation.Id = _listPreparation.Id;
                    }
                    BusinessLogic.lnJoin _LNJoin = new BusinessLogic.lnJoin();
                    var _listJoin = _LNJoin.GetAllJoin().Where(x => x.Description.Trim() == item.Join.Description.Trim()).FirstOrDefault();
                    if (_listJoin != null)
                    {
                        item.Join.Id = _listJoin.Id;
                    }
                    BusinessLogic.lnOutsideEdgeProfile _LNOutsideEdgeProfile = new BusinessLogic.lnOutsideEdgeProfile();
                    var _listOutsideEdgeProfile = _LNOutsideEdgeProfile.GetAllOutsideEdgeProfile().Where(x => x.Description.Trim() == item.OutsideEdgeProfile.Description.Trim()).FirstOrDefault();
                    if (_listOutsideEdgeProfile != null)
                    {
                        item.OutsideEdgeProfile.Id = _listOutsideEdgeProfile.Id;
                    }
                    BusinessLogic.lnInsideEdgeProfile _LNInsideEdgeProfile = new BusinessLogic.lnInsideEdgeProfile();
                    var _listInsideEdgeProfile = _LNInsideEdgeProfile.GetAllInsideEdgeProfile().Where(x => x.Description.Trim() == item.InsideEdgeProfile.Description.Trim()).FirstOrDefault();
                    if (_listInsideEdgeProfile != null)
                    {
                        item.InsideEdgeProfile.Id = _listInsideEdgeProfile.Id;
                    }
                    BusinessLogic.lnVerticalDivisions _LNVerticalDivisions = new BusinessLogic.lnVerticalDivisions();
                    var _listVerticalDivisions = _LNVerticalDivisions.GetAllVerticalDivisions().Where(x => x.Quantity == item.VerticalDivisions.Quantity).FirstOrDefault();
                    if (_listVerticalDivisions != null)
                    {
                        item.VerticalDivisions.Id = _listVerticalDivisions.Id;
                    }
                    BusinessLogic.lnHorizontalDivisions _LNHorizontalDivisions = new BusinessLogic.lnHorizontalDivisions();
                    var _listHorizontalDivisions = _LNHorizontalDivisions.GetAllHorizontalDivisions().Where(x => x.Quantity == item.VerticalDivisions.Quantity).FirstOrDefault();
                    if (_listHorizontalDivisions != null)
                    {
                        item.HorizontalDivisions.Id = _listHorizontalDivisions.Id;
                    }
                    BusinessLogic.lnHingeDirection _LNHingeDirection = new BusinessLogic.lnHingeDirection();
                    var _listHingeDirection = _LNHingeDirection.GetAllHingeDirection().Where(x => x.Direction == item.HingeDirection.Direction).FirstOrDefault();
                    if (_listHingeDirection != null)
                    {
                        item.HingeDirection.Id = _listHingeDirection.Id;
                    }
                    BusinessLogic.lnDoorType _LNDoorType = new BusinessLogic.lnDoorType();
                    var _listDoorType = _LNDoorType.GetAllDoorType().Where(x => x.Description.Trim() == item.DoorType.Description.Trim()).FirstOrDefault();
                    if (_listDoorType != null)
                    {
                        item.DoorType.Id = _listDoorType.Id;
                    }

                    item.HingePositions = CalcularPosicionHing(item);
                    item.ProfilePicture = BuscarProfilePicture(item.OutsideEdgeProfile.Id, item.InsideEdgeProfile.Id, item.Panel.Id);
                    item.ItemCost = GetPricesDoor(item.Material, item.Panel, item.Height, item.Width, item.TopRail, item.BottomRail);
                    item.Picture = BuscarDoorPicture(item);

                    Order newOrder = new Order();
                    newOrder.SubTotal = item.ItemCost * item.Quantity;
                    item.SubTotal = newOrder.SubTotal;
                    decimal Tx = 0.0825m;
                    newOrder.Tax = newOrder.SubTotal * Tx;
                    newOrder.Total = newOrder.SubTotal + newOrder.Tax;
                    InsertarDoors(item, item.HingePositions, newOrder, CodUsuario);

                }
                reader.Close();
                return true;
            }
            catch (Exception error)
            {
                return false;
            }
            
                }


        public decimal GetPricesDoor(Material pMaterial, Panel pPanel, decimal Height, decimal width, TopRail pTopRail, BottomRail pBottomRail)
        {
            try
            {
                decimal precio = 0m;
                if (pPanel.Id == 2)
                {
                    if (pMaterial.Id == 1)
                    {
                        precio = 11.83m;
                    }
                    else if (pMaterial.Id == 7)
                    {
                        precio = 10.04m;
                    }
                    else if (pMaterial.Id == 6)
                    {
                        precio = 9.51m;
                    }
                    else if (pMaterial.Id == 4 || pMaterial.Id == 13)
                    {
                        precio = 10.49m;
                    }
                }
                else if (pPanel.Id == 5 || pPanel.Id == 6)
                {
                    if (pMaterial.Id == 1)
                    {
                        precio = 10.89m;
                    }
                    else if (pMaterial.Id == 7)
                    {
                        precio = 9.31m;
                    }
                    else if (pMaterial.Id == 6)
                    {
                        precio = 8.93m;
                    }
                    else if (pMaterial.Id == 4 || pMaterial.Id == 13)
                    {
                        precio = 9.66m;
                    }
                }

                if (pTopRail.Id == 3 || pBottomRail.Id == 3)
                {
                    precio = precio / 0.95m;
                }

                decimal CostoPuerta = (((Height * width) / 12) / 12) * (precio * 2);
                decimal CostoPuertaBase = precio * 2;
                decimal Resultado = 0m;
                if (CostoPuerta < CostoPuertaBase)
                {
                    Resultado = CostoPuertaBase;
                }
                else
                {
                    Resultado = CostoPuerta;
                }
                return Resultado;
            }
            catch
            {
                throw;
            }

        }

        public HingePositions CalcularPosicionHing(DoorsxUser pDoorsxUser)
        {

            pDoorsxUser.HingePositions = new HingePositions();
            pDoorsxUser.HingePositions.Position1 = "3.5";
            if (pDoorsxUser.Height < 5)
            {

                pDoorsxUser.Height = 5;
                decimal P2 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');
            }
            else if (pDoorsxUser.Height >= 5 && pDoorsxUser.Height < 37)
            {
                decimal P2 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');

            }
            else if (pDoorsxUser.Height >= 37 && pDoorsxUser.Height < 61)
            {
                decimal P2 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',', '.');

            }
            else if (pDoorsxUser.Height >= 61 && pDoorsxUser.Height < 81)
            {
                decimal P2 = ((decimal.Parse(pDoorsxUser.Height.ToString()) - 7) / 3) + decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',', '.');
                decimal P4 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position4 = P4.ToString().Replace(',', '.');
            }
            else if (pDoorsxUser.Height >= 81 && pDoorsxUser.Height < 97)
            {

                decimal P2 = (((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',', '.');

                decimal P4 = ((((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5")) - decimal.Parse(pDoorsxUser.Height.ToString());

                pDoorsxUser.HingePositions.Position4 = P4.ToString().Replace(',', '.');
                decimal P5 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position5 = P5.ToString().Replace(',', '.');

            }
            else {
                pDoorsxUser.Height = 96;
                decimal P2 = (((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',', '.');

                decimal P4 = ((((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5")) - decimal.Parse(pDoorsxUser.Height.ToString());

                pDoorsxUser.HingePositions.Position4 = P4.ToString().Replace(',', '.');
                decimal P5 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position5 = P5.ToString().Replace(',', '.');

            }

            return pDoorsxUser.HingePositions;
        }
        public bool InsertarDoors(DoorsxUser pDoorsxUser, HingePositions HingeP, Order Ord, int CodUsuario)
        {
            try
            {
                lnOrder _LNOrder = new lnOrder();
                lnHingePositions _LNHP = new lnHingePositions();
                int userID = CodUsuario;
                int idU = userID;
                
                Order item = _LNOrder.GetOrderByUser(idU).Where( x => x.Status.Id == 4).LastOrDefault();
                if (item == null)
                {
                    Order neworder = new Order()
                    {
                        User = new Model.User() { Id = userID },
                        Status = new Model.Status() { Id = 4 },
                        Type = new Model.Type() { Id = 1 },
                        Quantity = pDoorsxUser.Quantity,
                        SubTotal = Ord.SubTotal,
                        Tax = Ord.Tax,
                        Total = Ord.Total,
                        CreationDate = DateTime.Now,
                        CreatorUser = userID,
                        ModificationDate = DateTime.Now,
                        ModificationUser = userID
                    };

                    int IdOrder = _LNOrder.InsertOrder(neworder);
                    neworder.Id = IdOrder;

                    if (pDoorsxUser.HingePositions.Id == 2)
                    {
                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.Order = neworder;                        
                        pDoorsxUser.User.Id = idU;
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var OrDoor = _LN.InsertDoorsxUser(pDoorsxUser);
                        return true;
                    }
                    else
                    {
                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = HingeP.Position1,
                            Position2 = HingeP.Position2,
                            Position3 = HingeP.Position3,
                            Position4 = HingeP.Position4,
                            Position5 = HingeP.Position5,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdHingeP = _LNHP.InsertHingePositions(newhp);
                        newhp.Id = IdHingeP;

                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.Order = neworder;
                        pDoorsxUser.HingePositions = newhp;
                        pDoorsxUser.User.Id = idU;
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var OrDoor = _LN.InsertDoorsxUser(pDoorsxUser);
                        return true;
                    }                   
                }
                else if (item.Status.Id == 4)
                {
                    if (pDoorsxUser.HingePositions.Id == 2)
                    {
                        UpdateOrderExist(item, pDoorsxUser, Ord);
                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;                       
                        pDoorsxUser.Order = item;
                        pDoorsxUser.User.Id = idU;

                        var updaOrDoor = (InsertDoorsxUser(pDoorsxUser));
                        return true;
                    }
                    else
                    {
                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = HingeP.Position1,
                            Position2 = HingeP.Position2,
                            Position3 = HingeP.Position3,
                            Position4 = HingeP.Position4,
                            Position5 = HingeP.Position5,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdHingeP = _LNHP.InsertHingePositions(newhp);
                        newhp.Id = IdHingeP;

                        UpdateOrderExist(item, pDoorsxUser, Ord);
                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.HingePositions = newhp;
                        pDoorsxUser.Order = item;
                        pDoorsxUser.User.Id = idU;

                        var updaOrDoor = (InsertDoorsxUser(pDoorsxUser));
                        return true;
                    }
                    
                }
                else
                {
                    Order neworder = new Order()
                    {
                        User = new Model.User() { Id = userID },
                        Status = new Model.Status() { Id = 4 },
                        Type = new Model.Type() { Id = 1 },
                        Quantity = pDoorsxUser.Quantity,
                        SubTotal = Ord.SubTotal,
                        Tax = Ord.Tax,
                        Total = Ord.Total,
                        CreationDate = DateTime.Now,
                        CreatorUser = userID,
                        ModificationDate = DateTime.Now,
                        ModificationUser = userID
                    };

                    int IdOrder = _LNOrder.InsertOrder(neworder);

                    if (pDoorsxUser.HingePositions.Id == 3)
                    {
                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.Order = neworder;
                        pDoorsxUser.User.Id = idU;
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var OrDoor = _LN.InsertDoorsxUser(pDoorsxUser);
                        return true;
                    }
                    else
                    {
                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = HingeP.Position1,
                            Position2 = HingeP.Position2,
                            Position3 = HingeP.Position3,
                            Position4 = HingeP.Position4,
                            Position5 = HingeP.Position5,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdHingeP = _LNHP.InsertHingePositions(newhp);
                        newhp.Id = IdHingeP;

                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.Order = neworder;
                        pDoorsxUser.HingePositions = newhp;
                        pDoorsxUser.User.Id = idU;
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var OrDoor = _LN.InsertDoorsxUser(pDoorsxUser);
                        return true;
                    }

                }


            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool ModificarDoors(DoorsxUser pDoorsxUser, HingePositions HingeP, Order Ord, int CodUsuario)
        {
            try
            {
                BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
                BusinessLogic.lnDoorsxUser _LNDoorx = new BusinessLogic.lnDoorsxUser();
                lnHingePositions _LNHP = new lnHingePositions();
                int userID = CodUsuario;
                int idU = userID;

                
                Order item = _LNUPor.GetOrderById(Ord.Id);
                if (item.Status.Id == 4)
                {
                    //restar lo de la puerta modificada
                    var getDoorComple = _LNDoorx.GetDoorsxUserById(pDoorsxUser.Id);
                    item.Quantity = item.Quantity - getDoorComple.Quantity;
                    item.SubTotal = item.SubTotal - getDoorComple.SubTotal;
                    decimal taxDoor = getDoorComple.SubTotal * Convert.ToDecimal(0.0825);
                    decimal TaxRound = Math.Round(taxDoor * 100) / 100;
                    item.Tax = item.Tax - TaxRound;
                    decimal TotaltaxDoor = TaxRound + getDoorComple.SubTotal;
                    item.Total = item.Total - TotaltaxDoor;
                    var updateord = _LNUPor.UpdateOrder(item);

                    //sumar lo de la nueva puerta
                    item.Quantity = item.Quantity + pDoorsxUser.Quantity;
                    item.SubTotal = item.SubTotal + pDoorsxUser.SubTotal;
                    decimal taxDoor1 = pDoorsxUser.SubTotal * Convert.ToDecimal(0.0825);
                    decimal TaxRound1 = Math.Round(taxDoor1 * 100) / 100;
                    item.Tax = item.Tax + TaxRound1;
                    decimal TotaltaxDoor1 = TaxRound1 + pDoorsxUser.SubTotal;
                    item.Total = item.Total + TotaltaxDoor1;
                    item.ModificationDate = DateTime.Now;
                    var updateordnew = _LNUPor.UpdateOrder(item);                                    
                   
                    if (pDoorsxUser.HingePositions.Id == 2)
                    {
                        if(getDoorComple.HingePositions.Id != 2)
                        {
                            var deletehinge = _LNHP.DeleteHingePositions(HingeP.Id);
                        }                                            
                    }
                    else
                    {
                        if (getDoorComple.HingePositions.Id == 2)
                        {
                            HingePositions newhp = new HingePositions()
                            {
                                Status = new Model.Status() { Id = 1 },
                                Position1 = HingeP.Position1,
                                Position2 = HingeP.Position2,
                                Position3 = HingeP.Position3,
                                Position4 = HingeP.Position4,
                                Position5 = HingeP.Position5,
                                CreationDate = DateTime.Now,
                                CreatorUser = userID,
                                ModificationDate = DateTime.Now,
                                ModificationUser = userID
                            };

                            int IdHingeP = _LNHP.InsertHingePositions(newhp);
                            newhp.Id = IdHingeP;
                            pDoorsxUser.HingePositions = newhp;
                        }
                        else
                        {
                            HingeP.ModificationDate = DateTime.Now;
                            var updatehip = _LNHP.UpdateHingePositions(HingeP);
                        }
                        
                    }
                    pDoorsxUser.User.Id = getDoorComple.User.Id;
                    pDoorsxUser.CreationDate = getDoorComple.CreationDate;
                    pDoorsxUser.CreatorUser = getDoorComple.CreatorUser;
                    pDoorsxUser.ModificationDate = DateTime.Now;
                    var updateDoor = _LNDoorx.UpdateDoorsxUser(pDoorsxUser);               
                    return true;                    
                }
                else 
                {
                    return false;
                }               
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool UpdateOrderExist(Order item, DoorsxUser pDoorsxUser, Order Ord)
        {
            BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
            item.Quantity = item.Quantity + pDoorsxUser.Quantity;
            item.SubTotal = item.SubTotal + pDoorsxUser.SubTotal;
            item.Tax = item.Tax + Ord.Tax;
            item.Total = item.Total + Ord.Total;
            return _LNUPor.UpdateOrder(item);
        }
        #region Pictures
        public string BuscarProfilePicture(int pOutsideEdgeProfile, int pInsideEdgeProfile, int pPanel)
        {
            string respuesta = "/Content/img/Profile/img11.png";
            if (pPanel == 5)
            {
                respuesta = FlatPanel(pOutsideEdgeProfile, pInsideEdgeProfile);
            }
            if (pPanel == 6)
            {
                respuesta = FlatPanelBeaded(pOutsideEdgeProfile, pInsideEdgeProfile);
            }
            if (pPanel == 2)
            {
                respuesta = RaisedPanel(pOutsideEdgeProfile, pInsideEdgeProfile);
            }
            return respuesta;
        }
        public string FlatPanel(int Outside, int Inside)
        {
            string ProfileUrl = "img11.png";
            string urlFolder = "/Content/img/Profile/";
            if (Outside == 13)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Double_Roman_Ogee_shaker_goove_flatpanel.png";
                }
            }
            if (Outside == 2)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Fingerpull_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Fingerpull_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Fingerpull_Shaker22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Finger_pull_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 17)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Half_Reba_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Half_Reba_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Half_Reba_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Half_Reba_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 11)
            {

                if (Inside == 4)
                {
                    ProfileUrl = "-Little_bone_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Little_bone_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Little_bone_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Little_bone_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 5)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Reba_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Reba_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    //  ProfileUrl = "-Reba_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Reba_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 6)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Shaker_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Shaker_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Shaker_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Shaker_shaker_goove_flat_panel.png";
                }
            }
            return urlFolder + ProfileUrl;
        }
        public string FlatPanelBeaded(int Outside, int Inside)
        {
            string ProfileUrl = "img11.png";
            string urlFolder = "/Content/img/Profile/";
            if (Outside == 13)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Double_Roman_Ogee_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 2)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Fingerpull_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Fingerpull_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Fingerpull_Shaker22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Finger_pull_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 17)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Half_Reba_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Half_Reba_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Half_Reba_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Half_Reba_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 4)
            {

                if (Inside == 4)
                {
                    ProfileUrl = "-Little_bone_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Little_bone_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Little_bone_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Little_bone_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 5)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Reba_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Reba_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Reba_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Reba_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 6)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Shaker_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Shaker_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Shaker_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Shaker_shaker_goove_flat_panel_beaded.png";
                }
            }
            return urlFolder + ProfileUrl;
        }
        public string RaisedPanel(int Outside, int Inside)
        {
            string ProfileUrl = "img11.png";
            string urlFolder = "/Content/img/Profile/";
            if (Outside == 13)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Double_Roman_Ogee_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Double_Roman_Ogee_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 2)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Fingerpull_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Fingerpull_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-FingerPull-Shaker22-RaisedPanel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Finger-pull-shaker-goove-raised-panel.png";
                }
            }
            if (Outside == 17)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Half_Reba_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Half_Reba_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Half_Reba_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Half_Reba_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 4)
            {

                if (Inside == 4)
                {
                    ProfileUrl = "-Little_bone_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Little_bone_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Little_bone_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Little_bone_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 5)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Reba_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Reba_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Reba_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Reba_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 6)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Shaker_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Shaker_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Shaker_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Shaker_shaker_goove_raised_panel.png";
                }
            }
            return urlFolder + ProfileUrl;
        }

        public string BuscarDoorPicture(DoorsxUser pDoorxUser)
        {
            string respuesta = "/Content/img/Profile/img11.png";
            if (pDoorxUser.Panel.Id == 5)
            {
                respuesta = FlatPanelDoor(pDoorxUser);
            }
            if (pDoorxUser.Panel.Id == 6)
            {
                respuesta = "/Content/img/Doors/Cabinet Vector-17.png";
            }
            if (pDoorxUser.Panel.Id == 2)
            {
                respuesta = RaisedPanelDoor(pDoorxUser);
            }
            return respuesta;
        }

        public string FlatPanelDoor(DoorsxUser pDoorxUser)
        {
            var stile = pDoorxUser.TopRail.Id;
            var rail = pDoorxUser.BottomRail.Id;
            string DoorUrl = "img11.png";
            string urlFolder = "/Content/img/Doors/";
            if (pDoorxUser.Join.Id == 2)
            {
                if (pDoorxUser.DoorStyle.Id == 1009)
                {

                    DoorUrl = "Cabinet Vector-13.png";

                }
                else if (pDoorxUser.DoorStyle.Id == 1008)
                {


                }
                else {
                    DoorUrl = "Cabinet Vector-08.png";
                }
               

            }else  if (pDoorxUser.DoorStyle.Id == 1008)
                {
                    
                        DoorUrl = "Cabinet Vector-01.png";

                }else if (pDoorxUser.DoorStyle.Id == 1002)
                {
                    if (stile == 3 && rail == 3)
                    {
                        DoorUrl = "Cabinet Vector-02.png";
                    }
                    else if (stile == 1 && rail == 1)
                    {
                        DoorUrl = "Cabinet Vector-14.png";
                    }

                }else if (pDoorxUser.DoorStyle.Id == 1004)
                {
                    if (stile == 3 && rail == 3)
                    {
                        DoorUrl = "Cabinet Vector-05.png";
                    }
                    else if (stile == 1 && rail == 1)
                    {
                        DoorUrl = "Cabinet Vector-06.png";
                    }

                }else if (pDoorxUser.DoorStyle.Id == 1009)
                {
                    
                        DoorUrl = "Cabinet Vector-13.png";
                   

            }
            else
            {
                DoorUrl = "Cabinet Vector-02.png";
            }

          
            return urlFolder + DoorUrl;
        }
        public string RaisedPanelDoor(DoorsxUser pDoorxUser)
        {
            var stile = pDoorxUser.TopRail.Id;
            var rail = pDoorxUser.BottomRail.Id;
            string DoorUrl = "img11.png";
            string urlFolder = "/Content/img/Doors/";
          
                if (stile == 3 && rail == 3)
                {
                    if (pDoorxUser.DoorStyle.Id == 1008)
                    {

                        var inside = pDoorxUser.InsideEdgeProfile.Id;
                        var outside = pDoorxUser.OutsideEdgeProfile.Id;
                        if (outside != 6 && inside != 3 && inside != 7)
                        {
                            DoorUrl = "Cabinet Vector-09.png";
                        }
                        else if (outside == 6 && (inside == 3 || inside == 7))
                        {
                            DoorUrl = "Cabinet Vector-10.png";
                        }
                    }
                    else if (pDoorxUser.DoorStyle.Id == 1009)
                    {

                    }
                    else {
                        DoorUrl = "Cabinet Vector-16.png";
                    }

                }
                else if (stile == 1 && rail == 1)
                {
                    if (pDoorxUser.Panel.Id == 1009)
                    {

                    }
                    else {
                        DoorUrl = "Cabinet Vector-10.png";
                    }
                }


            if (pDoorxUser.Join.Id == 2)
            {
                DoorUrl = "Cabinet Vector-07.png";
            }
            return urlFolder + DoorUrl;
        }

        #endregion Pictures

    }
}
