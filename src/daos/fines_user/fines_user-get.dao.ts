import { Response } from "express";
import { ParamsFinesUserDAO_GETAll, ParamsFinesUserDAO_GETByID } from "../../helpers/interfaces";
import { FINES_USER_FIELDS } from "../../helpers/mapping"
import { MultasUsuarios } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";

export class FinesUserDAO_GET {
    /**
     * It gets all the fines users from the database, and returns them in a JSON format
     * 
     * @param {ParamsFinesUserDAO_GETAll} params 
     * @param {Response} res - Response =&gt; Express response object
     * @returns a Promise of unknown type.
     */
    protected static getAllFinesUsers = async (params: ParamsFinesUserDAO_GETAll, res: Response): Promise<unknown> => {
        try {
            const { from: offset, limit } = params
            if (offset < 0 || limit < 1) return badRequestStatus('El valor mínimo de from es 0, y el mínimo de limit es 1', res)

            const { count, rows } = await MultasUsuarios.findAndCountAll({
                offset, limit,
                attributes: [
                    FINES_USER_FIELDS.ID, FINES_USER_FIELDS.DOCUMENT
                ]
            })
            
            return okStatus({ from: offset, limit, count, data: rows }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesUserDAO_GET: ', error, res)
        }
    }

    /**
     * It gets a finesUser by its ID, and returns it in a JSON object
     * 
     * @param {ParamsFinesUserDAO_GETByID} params 
     * @param {Response} res - Response
     * @returns a Promise that resolves to an unknown type.
     */
    protected static getFinesUserById = async (params: ParamsFinesUserDAO_GETByID, res: Response): Promise<unknown> => {
        try {
            const { finesUserId: ID } = params

            const finesUser = await MultasUsuarios.findByPk(ID, {
                attributes: [ FINES_USER_FIELDS.ID, FINES_USER_FIELDS.DOCUMENT ]
            })
            if (!finesUser) return badRequestStatus(`No existe ninguna multa-usuario con el id ${ID}`, res)

            return okStatus({ finesUserId: ID, finesUser }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesUserDAO_GET: ', error, res)
        }
    }
}