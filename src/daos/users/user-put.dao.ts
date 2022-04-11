import { red } from "colors";
import { Response } from "express";
import { User } from "../../models";


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
            const { document, ...rest } = params
            const user = await User.findByPk(document)

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (!user.status) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} se encuentra inhabilitado`
            })

            await user.update({ ...rest })
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
            const user = await User.findByPk(document)

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (user.status) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} ya se encuentra habilitado`
            })

            await user.update({ status: 1 })
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