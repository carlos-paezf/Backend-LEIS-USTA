import { Response } from "express";
import { ParamsFinesDAO_POST } from "../../helpers/interfaces/fines.interface";
import { FINES_FIELDS } from "../../helpers/mapping/fines.fields";
import { Multas } from "../../models";
import { createdStatus, internalServerErrorStatus } from "../status_responses";
import { getCurrentDate } from '../../helpers';

/** 
 * It creates a new fines in the database
 *
 * @author Sergio Gil 
 */
export class FinesDAO_POST {
    /**
     * @param {ParamsFinesDAO_POST} params - ParamsFinesDAO_POST
     * @param {Response} res - Response
     * @returns a Promise.
     */
    protected static postFines = async (params: ParamsFinesDAO_POST, res: Response): Promise<unknown> => {
        try {
            const { nombre_multa } = params
            const { descripcion_multa } = params

            const fines = await Multas.create({
                nombre_multa,
                descripcion_multa,
                status: true,
                created_at: getCurrentDate(),
                updated_at: getCurrentDate()
            }, {
                returning: [ FINES_FIELDS.ID, FINES_FIELDS.NAME, FINES_FIELDS.DESCRIPTION ]
            })

            return createdStatus({ fines }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesDAO_POST: ', error, res)
        }
    }
}