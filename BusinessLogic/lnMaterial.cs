using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnMaterial
    {

        DataAccess.adMaterial _AD = new DataAccess.adMaterial();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Material.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Material> GetAllMaterial()
        {
            try
            {
                return _AD.GetAllMaterial();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Material por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Material GetMaterialById(int pId)
        {
            try
            {
                return _AD.GetMaterialById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertMaterial(Material pMaterial)
        {
            try
            {
                return _AD.InsertMaterial(pMaterial);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateMaterial(Material pMaterial)
        {
            try
            {
                _AD.UpdateMaterial(pMaterial);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteMaterial(int pId)
        {
            try
            {
                _AD.DeleteMaterial(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
