import { compareSync } from "bcryptjs";
import { Response } from "express";
import { generateJWT } from "../../helpers";
import { Usuarios } from "../../models";
import { USERS_FIELDS } from "../../helpers/mapping";
import { internalServerErrorStatus, okStatus, unauthorizedStatus } from "../status_responses";
import { ParamsAuthDAO_POSTLogin } from "../../helpers/interfaces";

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
    protected static loginWithEmailAndPassword = async (params: ParamsAuthDAO_POSTLogin, res: Response): Promise<unknown> => {
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

            if (!user) return unauthorizedStatus('Correo o contraseña incorrectos', res)
            if (user.enabled === false) return unauthorizedStatus('Usuario inhabilitado', res)

            const validPassword = compareSync(password, user.password.toString())
            if (!validPassword) return unauthorizedStatus('Correo o contraseña incorrectos - p', res)

            const token = await generateJWT({
                document: user.documento,
                username: user.username,
                role: user.id_rol
            })

            return okStatus({ token }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in AuthDAO_POST: ', error, res)
        }
    }
}