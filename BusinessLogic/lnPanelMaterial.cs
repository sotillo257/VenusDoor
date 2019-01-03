using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnPanelMaterial
    {
        DataAccess.adPanelMaterial _AD = new DataAccess.adPanelMaterial();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de PanelMaterial.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<PanelMaterial> GetAllPanelMaterial()
        {
            try
            {
                return _AD.GetAllPanelMaterial();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna PanelMaterial por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public PanelMaterial GetPanelMaterialById(int pId)
        {
            try
            {
                return _AD.GetPanelMaterialById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertPanelMaterial(PanelMaterial pPanelMaterial)
        {
            try
            {
                return _AD.InsertPanelMaterial(pPanelMaterial);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdatePanelMaterial(PanelMaterial pPanelMaterial)
        {
            try
            {
                _AD.UpdatePanelMaterial(pPanelMaterial);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeletePanelMaterial(int pId)
        {
            try
            {
                _AD.DeletePanelMaterial(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
