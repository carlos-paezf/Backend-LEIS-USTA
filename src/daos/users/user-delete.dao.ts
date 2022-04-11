import { Response } from "express"
import { User } from "../../models"
import { red } from 'colors';


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
            const user = await User.findByPk(document)

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (!user.status) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} se encuentra inhabilitado`
            })

            await user.update({ status: 0 })
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido inhabilitado correctamente`,
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