using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class InPreparation
    {
        DataAccess.adPreparation _AD = new DataAccess.adPreparation();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Preparation.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Preparation> GetAllPreparation()
        {
            try
            {
                return _AD.GetAllPreparation();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Preparation por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Preparation GetPreparationById(int pId)
        {
            try
            {
                return _AD.GetPreparationById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertPreparation(Preparation pPreparation)
        {
            try
            {
                return _AD.InsertPreparation(pPreparation);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdatePreparation(Preparation pPreparation)
        {
            try
            {
                _AD.UpdatePreparation(pPreparation);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeletePreparation(int pId)
        {
            try
            {
                _AD.DeletePreparation(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
