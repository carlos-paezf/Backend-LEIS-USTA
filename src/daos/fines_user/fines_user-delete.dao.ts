import { Response } from "express"
import { getCurrentDate } from "../../helpers"
import { ParamsFinesUserDAO_DELETE } from "../../helpers/interfaces";
import { FINES_USER_FIELDS } from "../../helpers/mapping";
import { MultasUsuarios, Usuarios } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";


export class FinesUserDAO_DELETE{
   /**
     * @param {ParamsFinesUserDAO_DELETE} params
     * @param {Response} res - Response
     * @returns 
     */
    public static deleteFinesUserByID = async (params: ParamsFinesUserDAO_DELETE, res: Response): Promise<unknown> => {
        try {
            const { finesUserId } = params

            const fines_user = await MultasUsuarios.findByPk(finesUserId, {
                attributes: [FINES_USER_FIELDS.ID, FINES_USER_FIELDS.DOCUMENT, "status", "updated_at"]
            })
            if (!fines_user) return badRequestStatus(`No se encuentra ningúna Multa Usuario con el id ${finesUserId}`, res)

            const name_finesUser = fines_user.documento_usuario

            if (!fines_user.status) return badRequestStatus(`La Multa Usuario '${name_finesUser}', ya se encuentra deshabilitado`, res)

            await Usuarios.update({
                status: false,
                updated_at: getCurrentDate()
            }, {
                where: { 'documento': finesUserId }
            })

            await fines_user.update({
                status: false,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Multa-Usuario '${name_finesUser}' con el id ${finesUserId}, ha sido eliminado exitosamente` }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyUserDAO_DELETE', error, res)
        }
    }
}