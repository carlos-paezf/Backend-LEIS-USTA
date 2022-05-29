import { Response } from "express";
import { getCurrentDate } from "../../helpers";
import { ParamsFinesDAO_PUT } from "../../helpers/interfaces/fines.interface";
import { FINES_FIELDS } from "../../helpers/mapping/fines.fields";
import {  Multas } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";

/** 
 * It updates a fines by id, if it exists and is enabled. 
 * 
 * @author Sergio Gil
 */
export class FinesDAO_PUT {
    /**
     * It updates a fines by id, if it exists and is enabled
     * 
     * @param {ParamsFinesDAO_PUT} params - ParamsFinesDAO_PUT
     * @param {Response} res - Response
     * @returns a promise.
     */
    protected static updateFinesById = async (params: ParamsFinesDAO_PUT, res: Response): Promise<unknown> => {
        try {
            const { finesId: id, nombre_multa } = params

            const fines = await Multas.findByPk(id, {
                attributes: [FINES_FIELDS.NAME, FINES_FIELDS.DESCRIPTION, FINES_FIELDS.STATUS,]
            })
            if (!fines) return badRequestStatus(`No se encuentra ninguna Multa con del ${id}`, res)

            if (!fines.status) return badRequestStatus(`La Multa ${fines.nombre_multa}, se encuentra deshabilitada`, res)

            await fines.update({
                nombre_multa,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Multa con el id ${id} ha sido actualizada correctamente`, fines}, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesDAO_PUT: ', error, res)
        }
    }
}
