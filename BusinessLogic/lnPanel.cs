using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnPanel
    {
        DataAccess.adPanel _AD = new DataAccess.adPanel();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de Panel.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<Panel> GetAllPanel()
        {
            try
            {
                return _AD.GetAllPanel();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna Panel por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public Panel GetPanelById(int pId)
        {
            try
            {
                return _AD.GetPanelById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertPanel(Panel pPanel)
        {
            try
            {
                return _AD.InsertPanel(pPanel);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdatePanel(Panel pPanel)
        {
            try
            {
                _AD.UpdatePanel(pPanel);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeletePanel(int pId)
        {
            try
            {
                _AD.DeletePanel(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
