import { red } from "colors";
import { Response } from "express";
import { genSaltSync, hashSync } from 'bcryptjs';
import { Usuarios } from "../../models";
import { USERS_FIELDS } from "../../helpers/mapping";


/**
 * It update user information or enable their status in the database
 * 
 * @author Carlos Páez
 */
export class UserDAO_PUT {
    /**
     * It update user information in the database, and returns the new user info
     * 
     * @param {any} params - Data to update
     * @param {Response} res - Response
     * @returns The response object
     */
    protected static updateUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document, password, ...rest } = params
            const user = await Usuarios.findByPk(document, {
                attributes: [USERS_FIELDS.DOCUMENT]
            })

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (user.enabled === false) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} se encuentra inhabilitado`
            })

            const salt = genSaltSync()
            await user.update({ ...rest, 'password': hashSync(password, salt), 'updated_at': new Date() })

            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido actualizado correctamente`,
                user
            })
        } catch (error) {
            console.log(red('Error in UserDAO_PUT: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
        }
    }


    /**
     * It enable the user status and return the updated data
     * 
     * @param {any} params - The user document
     * @param {Response} res - Response
     * @returns The response object
     */
    protected static enableUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params
            const user = await Usuarios.findByPk(document, {
                attributes: [USERS_FIELDS.DOCUMENT, USERS_FIELDS.USERNAME, USERS_FIELDS.EMAIL, USERS_FIELDS.ENABLED]
            })

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (user.enabled) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} ya se encuentra habilitado`
            })

            await user.update({ enabled: 1, 'updated_at': new Date() })
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido habilitado correctamente`,
                user
            })
        } catch (error) {
            console.log(red('Error in UserDAO_PUT: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}