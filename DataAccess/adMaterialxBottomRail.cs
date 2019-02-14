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
    public class adMaterialxBottomRail : Connection
    {
        public MaterialxBottomRail GetMaterialxBottomRailById(int Id)
        {
            MaterialxBottomRail matrail = new MaterialxBottomRail();
            string sql = @"[spGetMaterialxBottomRail] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "MaterialxBottomRail", sql, _CN);
                if (ds.Tables["MaterialxBottomRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["MaterialxBottomRail"].Rows)
                    {
                        matrail = new MaterialxBottomRail()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString(), },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return matrail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<MaterialxBottomRail> GetAllMaterialxBottomRail()
        {
            List<MaterialxBottomRail> matrail = new List<MaterialxBottomRail>();
            string sql = @"[spGetAllMaterialxBottomRail]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "MaterialxBottomRail", sql, _CN);
                if (ds.Tables["MaterialxBottomRail"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["MaterialxBottomRail"].Rows)
                    {
                        matrail.Add(new MaterialxBottomRail()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Material = new Material() { Id = int.Parse(item["IdMaterial"].ToString()), Description = item["DescripMaterial"].ToString(), },
                            BottomRail = new BottomRail() { Id = int.Parse(item["IdBottomRail"].ToString()), Description = item["DescripBottomRail"].ToString(), },
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return matrail;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
        {
            string sql = @"[spInsertMaterialxBottomRail] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}','{6}'";
            sql = string.Format(sql, pMaterialxBottomRail.Material.Id, pMaterialxBottomRail.BottomRail.Id, pMaterialxBottomRail.Status.Id, pMaterialxBottomRail.CreationDate.ToString("yyyyMMdd"),
                pMaterialxBottomRail.CreatorUser, pMaterialxBottomRail.ModificationDate.ToString("yyyyMMdd"), pMaterialxBottomRail.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
        {
            string sql = @"[spUpdateMaterialxBottomRail] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql,pMaterialxBottomRail.Id, pMaterialxBottomRail.Material.Id, pMaterialxBottomRail.BottomRail.Id, pMaterialxBottomRail.Status.Id, pMaterialxBottomRail.ModificationDate.ToString("yyyyMMdd"),
                pMaterialxBottomRail.ModificationUser);
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
        /// @Descripción: Elimina MaterialxBottomRail por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteMaterialxBottomRail(int pId)
        {
            string sql = @"[spDeleteMaterialxBottomRail] '{0}'";
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
