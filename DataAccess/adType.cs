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
    public class adType : Connection
    {
        public Model.Type GetTypeById(int Id)
        {
            Model.Type typ = new Model.Type();
            string sql = @"[spGetType] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Type", sql, _CN);
                if (ds.Tables["Type"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Type"].Rows)
                    {
                        typ = new Model.Type()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Group = new Group() { Id = int.Parse(item["IdGroup"].ToString()), Description = item["DescripGroup"].ToString() },

                        };
                    }
                }
                return typ;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Model.Type> GetAllType()
        {
            List<Model.Type> typ = new List<Model.Type>();
            string sql = @"[spGetAllType]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Type", sql, _CN);
                if (ds.Tables["Type"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Type"].Rows)
                    {
                        typ.Add(new Model.Type()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Group = new Group() { Id = int.Parse(item["IdGroup"].ToString()), Description = item["DescripGroup"].ToString() },

                        });
                    }
                }
                return typ;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertType(Model.Type pType)
        {
            string sql = @"[spInsertType] '{0}', '{1}'";
            sql = string.Format(sql, pType.Description, pType.Group.Id);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdateType(Model.Type pType)
        {
            string sql = @"[spUpdateType] '{0}', '{1}', '{2}'";
            sql = string.Format(sql,pType.Id, pType.Description, pType.Group.Id);
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
        /// @Descripción: Elimina Type por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeleteType(int pId)
        {
            string sql = @"[spDeleteType] '{0}'";
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
