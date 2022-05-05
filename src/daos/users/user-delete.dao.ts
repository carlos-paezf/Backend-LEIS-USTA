import { Response } from "express"
import { Usuarios } from "../../models";
import { USERS_FIELDS } from "../../helpers/mapping";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";


/**
 * In this class are the methods to remove or disable an user
 * 
 * @author Carlos Páez
 */
export class UserDAO_DELETE {
    /**
     * It disable an user and return the user data
     * 
     * @param {any} params - The user document
     * @param {Response} res - Response
     * @returns The response object
     */
    protected static disableUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params
            
            const user = await Usuarios.findByPk(document, {
                attributes: [USERS_FIELDS.DOCUMENT, USERS_FIELDS.USERNAME, USERS_FIELDS.EMAIL, USERS_FIELDS.ENABLED]
            })

            if (!user) return badRequestStatus(`No existe un usuario con el documento ${document}`, res)

            if (!user.enabled) return badRequestStatus(`El usuario con el documento ${document} se encuentra inhabilitado`, res)

            await user.update({ enabled: 0, 'updated_at': new Date() })

            return okStatus({ msg: `El usuario con el documento ${document}, ha sido inhabilitado correctamente`, user }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in UserDAO_DELETE: ', error, res)
        }
    }


    /**
     * Permanently delete an user from the database
     * 
     * @param {any} params - The user document
     * @param {Response} res - Response
     * @returns A confirmation message 
     */
    protected static permanentlyDeleteUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params

            const user = await Usuarios.findByPk(document, { attributes: [USERS_FIELDS.DOCUMENT] })
            if (!user) return badRequestStatus(`No existe un usuario con el documento ${document}`, res) 

            await user.destroy()

            return okStatus({ msg: `El usuario con el documento ${document}, ha sido eliminado correctamente de la base de datos` }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in UserDAO_DELETE: ', error, res)
        }
    }
}