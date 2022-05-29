import { Response } from "express";
import { ParamsFinesUserDAO_POST } from "../../helpers/interfaces";
import { FINES_USER_FIELDS } from "../../helpers/mapping";
import { createdStatus, internalServerErrorStatus } from "../status_responses";
import { getCurrentDate } from '../../helpers';
import { MultasUsuarios } from "../../models";

/** 
 * It creates a new faculty Usuario in the database
 *
 * @author Sergio Gil 
 */
export class FinesUserDAO_POST {
    /**
     * It creates a new Fines Usuarers in the database
     * @param {ParamsFinesUserDAO_POST} params - ParamsFinesUserDAO_POST
     * @param {Response} res - Response
     * @returns a Promise.
     */
    protected static postFinesUser = async (params: ParamsFinesUserDAO_POST, res: Response): Promise<unknown> => {
        try {
            const { documento_usuario } = params

            const finesUser = await MultasUsuarios.create({
                documento_usuario,
                status: true,
                created_at: getCurrentDate(),
                updated_at: getCurrentDate()
            }, {
                returning: [ FINES_USER_FIELDS.ID, FINES_USER_FIELDS.DOCUMENT ]
            })

            return createdStatus({ finesUser }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesUserDAO_POST: ', error, res)
        }
    }
}