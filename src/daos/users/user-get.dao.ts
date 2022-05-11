import { Response } from "express"
import { Estados, Roles, Usuarios } from "../../models";
import { ROLES_FIELDS, STATUS_FIELDS, USERS_FIELDS } from "../../helpers/mapping";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";
import { ParamsUserDAO_GETAll, ParamsUserDAO_GETByID } from "../../helpers/interfaces";


/**
 * It gets all users from the database, and returns them in a JSON response 
 * 
 * @author Carlos Páez
 */
export class UsersDAO_GET {
    /**
     * It gets all users from the database, and returns them in a JSON response.
     * @param {any} params - { from: 0, limit: 10, actives: true }
     * @param {Response} res - Response
     * @returns The response object.
     */
    protected static getAllUsers = async (params: ParamsUserDAO_GETAll, res: Response): Promise<unknown> => {
        try {
            const { from, limit, all } = params
            if (from < 0 || limit < 1) return badRequestStatus('El valor mínimo de from es 0, y el mínimo de limit es 1', res)

            const { count, rows } = await Usuarios.findAndCountAll({
                offset: from, limit,
                attributes: [
                    USERS_FIELDS.DOCUMENT, USERS_FIELDS.TYPE_DOCUMENT,
                    USERS_FIELDS.FIRST_NAME, USERS_FIELDS.LAST_NAME, USERS_FIELDS.USERNAME,
                    USERS_FIELDS.EMAIL, USERS_FIELDS.CONTACT_NUMBER, USERS_FIELDS.ENABLED,
                    USERS_FIELDS.STATUS, USERS_FIELDS.ROLE
                ],
                where: (!all) ? { 'enabled': true } : {},
                include: [
                    {
                        model: Roles,
                        attributes: [ROLES_FIELDS.NAME, ROLES_FIELDS.DESCRIPTION]
                    },
                    {
                        model: Estados,
                        attributes: [STATUS_FIELDS.NAME, STATUS_FIELDS.DESCRIPTION]
                    }
                ]
            })
            
            return okStatus({ from, limit, count, all, data: rows }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in UserDAO_GET: ', error, res)
        }
    }

    /**
     * It gets a user by document, if the user doesn't exist, it returns a 400 status code with a
     * message, if the user exists but is disabled, it returns a 400 status code with a message, if the
     * user exists and is enabled, it returns a 200 status code with the user.
     * @param {any} params - any, res: Response
     * @param {Response} res - Response
     * @returns The user object
     */
    protected static getUserByDocument = async (params: ParamsUserDAO_GETByID, res: Response): Promise<unknown> => {
        try {
            const { document } = params

            const user = await Usuarios.findByPk(document, {
                attributes: [
                    USERS_FIELDS.DOCUMENT, USERS_FIELDS.TYPE_DOCUMENT,
                    USERS_FIELDS.FIRST_NAME, USERS_FIELDS.LAST_NAME, USERS_FIELDS.USERNAME,
                    USERS_FIELDS.EMAIL, USERS_FIELDS.CONTACT_NUMBER, USERS_FIELDS.ENABLED,
                    USERS_FIELDS.STATUS, USERS_FIELDS.ROLE
                ],
                include: [
                    {
                        model: Roles,
                        attributes: [ROLES_FIELDS.NAME, ROLES_FIELDS.DESCRIPTION]
                    },
                    {
                        model: Estados,
                        attributes: [STATUS_FIELDS.NAME, STATUS_FIELDS.DESCRIPTION]
                    }
                ]
            })

            if (!user) return badRequestStatus(`No existe un usuario con el documento ${document}`, res)

            if (user.enabled === false) return badRequestStatus(`El usuario con el documento ${document} está inhabilitado`, res)

            return okStatus({ document, user }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in UserDAO_GET: ', error, res)
        }
    }
}