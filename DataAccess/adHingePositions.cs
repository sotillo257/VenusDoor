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
    public class adHingePositions : Connection
    {
        public HingePositions GetHingePositionsById(int Id)
        {
            HingePositions hingep = new HingePositions();
            string sql = @"[spGetHingePositions] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HingePositions", sql, _CN);
                if (ds.Tables["HingePositions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HingePositions"].Rows)
                    {
                        hingep = new HingePositions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Position1 = item["Position1"].ToString(),
                            Position2 = item["Position2"].ToString(),
                            Position3 = item["Position3"].ToString(),
                            Position4 = item["Position4"].ToString(),
                            Position5 = item["Position5"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return hingep;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<HingePositions> GetAllHingePositions()
        {
            List<HingePositions> hingep = new List<HingePositions>();
            string sql = @"[spGetAllHingePositions]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "HingePositions", sql, _CN);
                if (ds.Tables["HingePositions"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["HingePositions"].Rows)
                    {
                        hingep.Add(new HingePositions()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            Position1 = item["Position1"].ToString(),
                            Position2 = item["Position2"].ToString(),
                            Position3 = item["Position3"].ToString(),
                            Position4 = item["Position4"].ToString(),
                            Position5 = item["Position5"].ToString(),
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return hingep;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertHingePositions(HingePositions pHingePositions)
        {
            string sql = @"[spInsertHingePositions] '{0}', '{1}', '{2}', '{3}', '{4}', '{5}'";
            sql = string.Format(sql, pHingePositions.Position1, pHingePositions.Position2, pHingePositions.Position3, pHingePositions.Position4, pHingePositions.Position5, pHingePositions.Status.Id, pHingePositions.CreationDate.ToString("yyyy-MM-dd"),
                pHingePositions.CreatorUser, pHingePositions.ModificationDate.ToString("yyyy-MM-dd"), pHingePositions.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateHingePositions(HingePositions pHingePositions)
        {
            string sql = @"[spUpdateHingePositions] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pHingePositions.Position1, pHingePositions.Position2, pHingePositions.Position3, pHingePositions.Position4, pHingePositions.Position5, pHingePositions.Status.Id, pHingePositions.ModificationDate.ToString("yyyy-MM-dd"),
                pHingePositions.ModificationUser);
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
        /// @Descripción: Elimina HingePositions por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteHingePositions(int pId)
        {
            string sql = @"[spDeleteHingePositions] '{0}'";
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
