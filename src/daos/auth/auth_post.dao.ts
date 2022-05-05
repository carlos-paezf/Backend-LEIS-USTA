import { compareSync } from "bcryptjs";
import { Response } from "express";
import { red } from 'colors';
import { generateJWT } from "../../helpers";
import { Usuarios } from "../../models";
import { USERS_FIELDS } from "../../helpers/mapping";

/**
 * This class is used to log in with email and password.
 * 
 * @author Carlos Páez
 */
export class AuthDAO_POST {
    /**
     * In this function we take the email and password entered by the body and use it to log in
     * 
     * @param {any} params 
     * @param {Response} res 
     * @returns 
     */
    protected static loginWithEmailAndPassword = async (params: any, res: Response): Promise<any> => {
        try {
            const { email, password } = params
            const user = await Usuarios.findOne({
                where: { email },
                attributes: [
                    USERS_FIELDS.DOCUMENT,
                    USERS_FIELDS.ROLE,
                    USERS_FIELDS.EMAIL,
                    USERS_FIELDS.PASSWORD,
                    USERS_FIELDS.USERNAME
                ]
            })
            if (!user) return res.status(401).json({ ok: false, msg: 'Correo o contraseña incorrectos - c' })
            if (user.enabled === false) return res.status(401).json({ ok: false, msg: 'Usuario inhabilitado' })

            const validPassword = compareSync(password, user.password.toString())
            if (!validPassword) return res.status(401).json({ ok: false, msg: 'Correo o contraseña incorrectos - p' })

            const token = await generateJWT({
                document: user.documento,
                username: user.username,
                role: user.id_rol
            })

            return res.status(200).json({
                ok: true,
                token,
            })
        } catch (error) {
            console.log(red('Error in AuthDAO_POST: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
        }
    }
}