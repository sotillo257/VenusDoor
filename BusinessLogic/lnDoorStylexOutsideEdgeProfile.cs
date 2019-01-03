using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BusinessLogic
{
    public class lnDoorStylexOutsideEdgeProfile
    {
        DataAccess.adDoorStylexOutsideEdgeProfile _AD = new DataAccess.adDoorStylexOutsideEdgeProfile();

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna toda la Lista de DoorStylexOutsideEdgeProfile.
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        public List<DoorStylexOutsideEdgeProfile> GetAllDoorStylexOutsideEdgeProfile()
        {
            try
            {
                return _AD.GetAllDoorStylexOutsideEdgeProfile();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        /// <summary>
        /// @Autor: Jesus Sotillo
        /// @Fecha Creacion: 29/12/2018
        /// @Descripción: Retorna DoorStylexOutsideEdgeProfile por Id.
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public DoorStylexOutsideEdgeProfile GetDoorStylexOutsideEdgeProfileById(int pId)
        {
            try
            {
                return _AD.GetDoorStylexOutsideEdgeProfileById(pId);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public int InsertDoorStylexOutsideEdgeProfile(DoorStylexOutsideEdgeProfile pDoorStylexOutsideEdgeProfile)
        {
            try
            {
                return _AD.InsertDoorStylexOutsideEdgeProfile(pDoorStylexOutsideEdgeProfile);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool UpdateDoorStylexOutsideEdgeProfile(DoorStylexOutsideEdgeProfile pDoorStylexOutsideEdgeProfile)
        {
            try
            {
                _AD.UpdateDoorStylexOutsideEdgeProfile(pDoorStylexOutsideEdgeProfile);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public bool DeleteDoorStylexOutsideEdgeProfile(int pId)
        {
            try
            {
                _AD.DeleteDoorStylexOutsideEdgeProfile(pId);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
