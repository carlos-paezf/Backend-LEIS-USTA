import { red } from "colors"
import { Response } from "express"
import { ConnectionDB } from '../../config';
import { Roles, Usuarios } from "../../models";
import { ROLES_FIELDS, USERS_FIELDS } from "../../helpers/mapping";
import { USERS_SQL } from "../../repositories";


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
    protected static getAllUsers = async (params: any, res: Response): Promise<any> => {
        try {
            const { from, limit, all } = params
            if (from < 0 || limit < 1) return res.status(400).json({
                ok: false,
                msg: 'El valor mínimo de from es 0, y el mínimo de limit es 1'
            })
            const { count, rows } = await Usuarios.findAndCountAll({
                offset: from, limit,
                attributes: [
                    USERS_FIELDS.DOCUMENT, USERS_FIELDS.TYPE_DOCUMENT,
                    USERS_FIELDS.FIRST_NAME, USERS_FIELDS.LAST_NAME, USERS_FIELDS.USERNAME,
                    USERS_FIELDS.EMAIL, USERS_FIELDS.CONTACT_NUMBER, USERS_FIELDS.ENABLED,
                    [ConnectionDB.sequelize.literal(USERS_SQL.CASE_STATUS), USERS_FIELDS.STATUS],
                ],
                where: (!all) ? { 'enabled': true } : {},
                include: [
                    {
                        model: Roles,
                        attributes: [ROLES_FIELDS.NAME, ROLES_FIELDS.DESCRIPTION]
                    }
                ]
            })
            return res.status(200).json({
                ok: true,
                from, limit, count, all,
                data: rows
            })
        } catch (error) {
            console.log(red('Error in UserDAO_GET: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
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
    protected static getUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params
            
            const user = await Usuarios.findByPk(document, {
                attributes: [
                    USERS_FIELDS.DOCUMENT, USERS_FIELDS.TYPE_DOCUMENT,
                    USERS_FIELDS.FIRST_NAME, USERS_FIELDS.LAST_NAME, USERS_FIELDS.USERNAME,
                    USERS_FIELDS.EMAIL, USERS_FIELDS.CONTACT_NUMBER, USERS_FIELDS.ENABLED,
                    [ConnectionDB.sequelize.literal(USERS_SQL.CASE_STATUS), USERS_FIELDS.STATUS],
                ],
                include: [
                    {
                        model: Roles,
                        attributes: [ROLES_FIELDS.NAME, ROLES_FIELDS.DESCRIPTION]
                    }
                ]
            })

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })

            if (user.enabled === false) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} está inhabilitado`,
                user
            })

            return res.json({ ok: true, document, user })
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
        }
    }
}