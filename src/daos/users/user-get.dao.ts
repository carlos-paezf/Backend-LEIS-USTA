import { red } from "colors"
import { Response } from "express"
import { User } from "../../models"


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
            const { count, rows } = await User.findAndCountAll({
                offset: from, limit,
                where: (!all) ? { 'enabled': true } : { }
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
            const user = await User.findByPk(document)
            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (!user.enabled) return res.status(400).json({ 
                ok: false, 
                msg: `El usuario con el documento ${document} está inhabilitado`,
            })
            return res.json({ ok: true, user })
        } catch (error) {
            return res.status(500).json({ 
                ok: false, 
                msg: 'Comuníquese con el Administrador'
            })
        }
    }
}