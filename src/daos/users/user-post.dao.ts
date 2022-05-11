import { Response } from "express";
import { genSaltSync, hashSync } from 'bcryptjs'
import { Usuarios } from "../../models";
import { USERS_FIELDS } from "../../helpers/mapping";
import { createdStatus, internalServerErrorStatus } from "../status_responses";
import { ParamsUserDAO_POST } from "../../helpers/interfaces";
import { getCurrentDate } from "../../helpers";


/**
 * It creates a user in the database and returns a response with the created user
 * 
 * @author Carlos Páez
 */
export class UserDAO_POST {
    /**
     * It creates a user in the database and returns a response with the created user.
     * @param {any} params - {
     * @param {Response} res - Response; Express.Response
     * @returns a promise.
     */
    protected static createUser = async (params: ParamsUserDAO_POST, res: Response): Promise<unknown> => {
        try {
            const { password, ...rest } = params

            const salt = genSaltSync()

            const user = await Usuarios.create({
                ...rest,
                'password': hashSync(password, salt),
                id_rol: 3,
                status: 1,
                enabled: 1,
                created_at: getCurrentDate(),
                updated_at: getCurrentDate()
            }, {
                returning: [
                    USERS_FIELDS.DOCUMENT, USERS_FIELDS.TYPE_DOCUMENT,
                    USERS_FIELDS.FIRST_NAME, USERS_FIELDS.LAST_NAME, USERS_FIELDS.USERNAME,
                    USERS_FIELDS.EMAIL, USERS_FIELDS.CONTACT_NUMBER
                ]
            })

            return createdStatus({ user }, res)
        } catch (error) {
            internalServerErrorStatus('Error in UserDAO_POST: ', error, res)
        }
    }
}