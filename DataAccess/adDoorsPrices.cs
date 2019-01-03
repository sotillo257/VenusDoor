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
    public class adDoorsPrices : Connection
    {
        public DoorsPrices GetDoorsPricesById(int Id)
        {
            DoorsPrices doorprice = new DoorsPrices();
            string sql = @"[spGetDoorsPrices] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorsPrices", sql, _CN);
                if (ds.Tables["DoorsPrices"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorsPrices"].Rows)
                    {
                        doorprice = new DoorsPrices()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdDoorStyle = int.Parse(item["IdDoorStyle"].ToString()),
                            IdMaterial = int.Parse(item["IdMaterial"].ToString()),
                            IdStileWidth = int.Parse(item["IdStileWidth"].ToString()),
                            IdRailWidth = int.Parse(item["IdRailWidth"].ToString()),
                            BasePrice = decimal.Parse(item["BasePrice"].ToString()),
                            AdditionalSFPrice = decimal.Parse(item["AdditionalSFPrice"].ToString()),
                            VerticalBase1FLPrice = decimal.Parse(item["VerticalBase1FLPrice"].ToString()),
                            VerticalAdditionalInchPrice = decimal.Parse(item["VerticalAdditionalInchPrice"].ToString()),
                            HorizontalBase1FLPrice = decimal.Parse(item["HorizontalBase1FLPrice"].ToString()),
                            HorizontalAdditionalInchPrice = decimal.Parse(item["HorizontalAdditionalInchPrice"].ToString()),
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
                return doorprice;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DoorsPrices> GetAllDoorsPrices()
        {
            List<DoorsPrices> doorprice = new List<DoorsPrices>();
            string sql = @"[spGetAllDoorsPrices]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "DoorsPrices", sql, _CN);
                if (ds.Tables["DoorsPrices"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["DoorsPrices"].Rows)
                    {
                        doorprice.Add(new DoorsPrices()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            IdDoorStyle = int.Parse(item["IdDoorStyle"].ToString()),
                            IdMaterial = int.Parse(item["IdMaterial"].ToString()),
                            IdStileWidth = int.Parse(item["IdStileWidth"].ToString()),
                            IdRailWidth = int.Parse(item["IdRailWidth"].ToString()),
                            BasePrice = decimal.Parse(item["BasePrice"].ToString()),
                            AdditionalSFPrice = decimal.Parse(item["AdditionalSFPrice"].ToString()),
                            VerticalBase1FLPrice = decimal.Parse(item["VerticalBase1FLPrice"].ToString()),
                            VerticalAdditionalInchPrice = decimal.Parse(item["VerticalAdditionalInchPrice"].ToString()),
                            HorizontalBase1FLPrice = decimal.Parse(item["HorizontalBase1FLPrice"].ToString()),
                            HorizontalAdditionalInchPrice = decimal.Parse(item["HorizontalAdditionalInchPrice"].ToString()),
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
                return doorprice;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertDoorsPrices(DoorsPrices pDoorsPrices)
        {
            string sql = @"[spInsertDoorsPrices] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}','{6}','{7}','{8}','{9}','{10}'
            ,'{11}','{12}','{13}','{14}','{15}','{16}'";
            sql = string.Format(sql, pDoorsPrices.IdDoorStyle, pDoorsPrices.IdMaterial, pDoorsPrices.IdStileWidth, 
                pDoorsPrices.IdRailWidth, pDoorsPrices.BasePrice, pDoorsPrices.AdditionalSFPrice, pDoorsPrices.VerticalBase1FLPrice, 
                pDoorsPrices.VerticalAdditionalInchPrice, pDoorsPrices.HorizontalBase1FLPrice, pDoorsPrices.HorizontalAdditionalInchPrice,
                pDoorsPrices.IdStatus, pDoorsPrices.CreationDate.ToString("yyyyMMdd"), pDoorsPrices.CreatorUser, 
                pDoorsPrices.ModificationDate.ToString("yyyyMMdd"), pDoorsPrices.ModificationUser, pDoorsPrices.Picture, pDoorsPrices.ProfilePicture);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateDoorsPrices(DoorsPrices pDoorsPrices)
        {
            string sql = @"[spInsertDoorsPrices] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}','{6}','{7}','{8}','{9}','{10}'
            ,'{11}','{12}','{13}','{14}'";
            sql = string.Format(sql, pDoorsPrices.IdDoorStyle, pDoorsPrices.IdMaterial, pDoorsPrices.IdStileWidth,
                pDoorsPrices.IdRailWidth, pDoorsPrices.BasePrice, pDoorsPrices.AdditionalSFPrice, pDoorsPrices.VerticalBase1FLPrice,
                pDoorsPrices.VerticalAdditionalInchPrice, pDoorsPrices.HorizontalBase1FLPrice, pDoorsPrices.HorizontalAdditionalInchPrice,
                pDoorsPrices.IdStatus, pDoorsPrices.ModificationDate.ToString("yyyyMMdd"), pDoorsPrices.ModificationUser, 
                pDoorsPrices.Picture, pDoorsPrices.ProfilePicture);
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
        /// @Descripción: Elimina DoorsPrices por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteDoorPrices(int pId)
        {
            string sql = @"[spDeleteDoorsPrices] '{0}'";
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
