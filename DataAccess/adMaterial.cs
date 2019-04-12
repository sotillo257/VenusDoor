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
    public class adMaterial : Connection
    {
        public Material GetMaterialById(int Id)
        {
            Material mate = new Material();
            string sql = @"[spGetMaterial] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Material", sql, _CN);
                if (ds.Tables["Material"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Material"].Rows)
                    {
                        mate = new Material()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            PriceFlatPanel = decimal.Parse(item["PriceFlatPanel"].ToString()),
                            PriceRaisedPanel = decimal.Parse(item["PriceRaisedPanel"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return mate;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Material> GetAllMaterial()
        {
            List<Material> mate = new List<Material>();
            string sql = @"[spGetAllMaterial]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Material", sql, _CN);
                if (ds.Tables["Material"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Material"].Rows)
                    {
                        mate.Add(new Material()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Description = item["Description"].ToString(),
                            PriceFlatPanel = decimal.Parse(item["PriceFlatPanel"].ToString()),
                            PriceRaisedPanel = decimal.Parse(item["PriceRaisedPanel"].ToString()),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return mate;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertMaterial(Material pMaterial)
        {
            string sql = @"[spInsertMaterial] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pMaterial.Description,pMaterial.PriceFlatPanel.ToString().Replace(',', '.'), pMaterial.PriceRaisedPanel.ToString().Replace(',', '.'), pMaterial.Status.Id,
                pMaterial.CreatorUser, pMaterial.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateMaterial(Material pMaterial)
        {
            string sql = @"[spUpdateMaterial] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}'";
            sql = string.Format(sql,pMaterial.Id, pMaterial.Description, pMaterial.PriceFlatPanel.ToString().Replace(',', '.'), pMaterial.PriceRaisedPanel.ToString().Replace(',', '.'),
                pMaterial.ModificationUser);
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
        /// @Descripción: Elimina Material por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteMaterial(int pId)
        {
            string sql = @"[spDeleteMaterial] '{0}'";
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
