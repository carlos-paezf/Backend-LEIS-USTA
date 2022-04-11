import { red } from "colors";
import { Response } from "express";
import { User } from "../../models";


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
    protected static createUser = async (params: any, res: Response) => {
        try {
            const user = await User.create({ ...params, status: 1 })
            return res.status(201).json({ ok: true, user })
        } catch (error) {
            console.log(red('Error in UserDAO_POST: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}