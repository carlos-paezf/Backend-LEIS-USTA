import { compareSync } from "bcryptjs";
import { Response } from "express";
import { User } from "../../models";
import { red } from 'colors';
import { generateJWT } from "../../helpers";

/**
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
            const user = await User.findOne({
                where: { email },
            })
            if (!user) return res.status(401).json({ ok: false, msg: 'Correo o contraseña incorrectos - c' })
            if (user.enabled === false) return res.status(401).json({ ok: false, msg: 'Usuario inhabilitado' })

            const validPassword = compareSync(password, user.password.toString())
            if (!validPassword) return res.status(401).json({ ok: false, msg: 'Correo o contraseña incorrectos - p' })

            const token = await generateJWT({
                document: user.document,
                username: user.username,
                role: user.role_id
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