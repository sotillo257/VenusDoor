﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using System.Data.SqlClient;
using System.Data;

namespace DataAccess
{
    public class adPreparation : Connection
    {
        public Preparation GetPreparationById(int Id)
        {
            Preparation preparation = new Preparation();
            string sql = @"[spGetPreparation] '{0}' ";
            sql = string.Format(sql, Id);

            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Preparation", sql, _CN);
                if (ds.Tables["Preparation"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Preparation"].Rows)
                    {
                        preparation = new Preparation()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        };
                    }
                }
                return preparation;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Preparation> GetAllPreparation()
        {
            List<Preparation> preparation = new List<Preparation>();
            string sql = @"[spGetAllPreparation]";
            try
            {
                DataSet ds = new DataSet();
                ds = _MB.CreaDS(ds, "Preparation", sql, _CN);
                if (ds.Tables["Preparation"].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables["Preparation"].Rows)
                    {
                        preparation.Add(new Preparation()
                        {
                            Id = int.Parse(item["Id"].ToString()),
                            Description = item["Description"].ToString(),
                            Status = new Status() { Id = int.Parse(item["IdStatus"].ToString()), Description = item["DescripStatus"].ToString() },
                            CreationDate = (item["CreationDate"].ToString() != "") ? DateTime.Parse(item["CreationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            ModificationDate = (item["ModificationDate"].ToString() != "") ? DateTime.Parse(item["ModificationDate"].ToString()) : DateTime.Parse("01/01/1900"),
                            CreatorUser = int.Parse(item["CreatorUser"].ToString()),
                            ModificationUser = int.Parse(item["ModificationUser"].ToString()),

                        });
                    }
                }
                return preparation;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public int InsertPreparation(Preparation pPreparation)
        {
            string sql = @"[spInsertPreparation] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql, pPreparation.Description, pPreparation.Status.Id,
                pPreparation.CreatorUser, pPreparation.ModificationUser);
            try
            {
                return _MB.EjecutarSQL(_CN, sql);
            }
            catch (Exception err)
            {
                throw err;
            }
        }

        public void UpdatePreparation(Preparation pPreparation)
        {
            string sql = @"[spUpdatePreparation] '{0}', '{1}', '{2}', '{3}'";
            sql = string.Format(sql,pPreparation.Id, pPreparation.Description, pPreparation.Status.Id,
                pPreparation.ModificationUser);
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
        /// @Descripción: Elimina Preparation por Id
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public void DeletePreparation(int pId)
        {
            string sql = @"[spDeletePreparation] '{0}'";
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
