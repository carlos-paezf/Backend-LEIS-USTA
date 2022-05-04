import { Response } from "express"
import { red } from 'colors';
import { Usuarios } from "../../models";
import { USERS_FIELDS } from "../../helpers/mapping";


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

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (!user.enabled) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} se encuentra inhabilitado`
            })

            await user.update({ enabled: 0, 'updated_at': new Date() })
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido inhabilitado correctamente`,
                user
            })
        } catch (error) {
            console.log(red('Error in UserDAO_DELETE: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
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
            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })

            await user.destroy()
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido eliminado correctamente de la base de datos`
            })
        } catch (error) {
            console.log(red('Error in UserDAO_DELETE: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}