import { Response } from "express";
import { ParamsFinesDAO_GETAll, ParamsFinesDAO_GETByID } from "../../helpers/interfaces/fines.interface";
import { FINES_FIELDS } from "../../helpers/mapping/fines.fields";
import { Multas } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";


export class FinesDAO_GET {
    /**
     * It gets all the fines from the database, and returns them in a JSON format
     * 
     * @param {ParamsFinesDAO_GETAll} params ParamsFinesDAO_GETAll
     * @param {Response} res - Response =&gt; Express response object
     * @returns a Promise of unknown type.
     */
    protected static getAllFines = async (params: ParamsFinesDAO_GETAll, res: Response): Promise<unknown> => {
        try {
            const { from: offset, limit } = params
            if (offset < 0 || limit < 1) return badRequestStatus('El valor mínimo de from es 0, y el mínimo de limit es 1', res)

            const { count, rows } = await Multas.findAndCountAll({
                offset, limit,
                attributes: [
                    FINES_FIELDS.ID, FINES_FIELDS.NAME, FINES_FIELDS.PRICE
                ]
            })
            
            return okStatus({ from: offset, limit, count, data: rows }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesDAO_GET: ', error, res)
        }
    }

    /**
     * It gets a fines by its ID, and returns it in a JSON object
     * 
     * @param {ParamsFinesDAO_GETByID} params - ParamsFinesDAO_GETByID
     * @param {Response} res - Response
     * @returns a Promise that resolves to an unknown type.
     */
    protected static getFinesById = async (params: ParamsFinesDAO_GETByID, res: Response): Promise<unknown> => {
        try {
            const { finesId: ID } = params

            const fines = await Multas.findByPk(ID, {
                attributes: [ FINES_FIELDS.ID, FINES_FIELDS.NAME ]
            })
            if (!fines) return badRequestStatus(`No existe ninguna multa con el id ${ID}`, res)

            return okStatus({ finesId: ID, fines }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesDAO_GET: ', error, res)
        }
    }
}