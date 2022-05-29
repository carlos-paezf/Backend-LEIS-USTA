import { Response } from "express";
import { getCurrentDate } from "../../helpers";
import { ParamsFinesUserDAO_PUT } from "../../helpers/interfaces";
import { FINES_USER_FIELDS } from "../../helpers/mapping";
import { MultasUsuarios } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";

/** 
 * It updates a finesUser by id, if it exists and is enabled. 
 * 
 * @author Sergio Gil
 */
export class FinesUserDAO_PUT {
    /**
     * It updates a finesUser by id, if it exists and is enabled
     * 
     * @param {ParamsFinesUserDAO_PUT} params - ParamsFinesUserDAO_PUT
     * @param {Response} res - Response
     * @returns a promise.
     */
    protected static updateFinesUserById = async (params: ParamsFinesUserDAO_PUT, res: Response): Promise<unknown> => {
        try {
            const { finesUserId: id, documento_usuario } = params

            const finesUser = await MultasUsuarios.findByPk(id, {
                attributes: [FINES_USER_FIELDS.DOCUMENT, 'status']
            })
            if (!finesUser) return badRequestStatus(`No se encuentra ninguna Multa-Usuario con del ${id}`, res)

            if (!finesUser.status) return badRequestStatus(`La Multa-Usuario ${finesUser.documento_usuario}, se encuentra deshabilitada`, res)

            await finesUser.update({
                documento_usuario,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Multa-Usuario con el id ${id} ha sido actualizada correctamente`, finesUser}, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesUserDAO_PUT: ', error, res)
        }
    }
}
