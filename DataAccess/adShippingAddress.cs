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
    public class adShippingAddress : Connection
    {
        public ShippingAddress GetShippingAddressById(int Id)
        {
            ShippingAddress ShippingAddress = new ShippingAddress();
            string sql = @"[spGetShippingAddress] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "ShippingAddress", sql, _CN);
                if (ds.Tables["ShippingAddress"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["ShippingAddress"].Rows)
                    {
                        ShippingAddress = new ShippingAddress()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["Name"].ToString(),
                            Contact = item["Contact"].ToString(),
                            Residence = item["Residence"].ToString(),
                            LotBlock = item["LotBlock"].ToString(),
                            Address = item["Address"].ToString(),
                            City = item["City"].ToString(),
                            St = item["St"].ToString(),
                            ZipCode = item["ZipCode"].ToString(),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()), Email = item["EmailUser"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },                            
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return ShippingAddress;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<ShippingAddress> GetAllShippingAddress()
        {
            List<ShippingAddress> ShippingAddress = new List<ShippingAddress>();
            string sql = @"[spGetAllShippingAddress]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "ShippingAddress", sql, _CN);
                if (ds.Tables["ShippingAddress"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["ShippingAddress"].Rows)
                    {
                        ShippingAddress.Add(new ShippingAddress()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Name = item["Name"].ToString(),
                            Contact = item["Contact"].ToString(),
                            Residence = item["Residence"].ToString(),
                            LotBlock = item["LotBlock"].ToString(),
                            Address = item["Address"].ToString(),
                            City = item["City"].ToString(),
                            St = item["St"].ToString(),
                            ZipCode = item["ZipCode"].ToString(),
                            User = new User() { Id = int.Parse(item["IdUser"].ToString()), Email = item["EmailUser"].ToString() },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return ShippingAddress;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertShippingAddress(ShippingAddress pShippingAddress)
        {
            string sql = @"[spInsertShippingAddress] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}'";
            sql = string.Format(sql, pShippingAddress.Name, pShippingAddress.Contact, pShippingAddress.Residence, pShippingAddress.LotBlock, pShippingAddress.Address, pShippingAddress.City, pShippingAddress.St, pShippingAddress.ZipCode, pShippingAddress.User.Id, pShippingAddress.Status.Id, pShippingAddress.CreationDate.ToString("yyyyMMdd"),
                pShippingAddress.CreatorUser, pShippingAddress.ModificationDate.ToString("yyyyMMdd"), pShippingAddress.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateShippingAddress(ShippingAddress pShippingAddress)
        {
            string sql = @"[spUpdateShippingAddress] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}'";
            sql = string.Format(sql, pShippingAddress.Id, pShippingAddress.Name, pShippingAddress.Contact, pShippingAddress.Residence, pShippingAddress.LotBlock, pShippingAddress.Address, pShippingAddress.City, pShippingAddress.St, pShippingAddress.ZipCode, pShippingAddress.User.Id, pShippingAddress.Status.Id, pShippingAddress.ModificationDate.ToString("yyyyMMdd"),
                pShippingAddress.ModificationUser);
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
        /// @Descripción: Elimina ShippingAddress por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteShippingAddress(int pId)
        {
            string sql = @"[spDeleteShippingAddress] '{0}'";
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
