import { red } from "colors"
import { Response } from "express"


/**
 * It logs the error to the console and returns a 500 status code with a message to the user
 * @param {string} msg - The message to be displayed in the console.
 * @param {any} error - any
 * @param {Response} res - Response =&gt; The response object
 * @returns a function.
 * 
 * @author Carlos Páez
 */
export const internalServerErrorStatus = (msg: string, error: unknown, res: Response): Response<unknown> => {
    console.log(red(msg), error)
    return res.status(500).json({
        ok: false,
        msg: 'Comuníquese con el Administrador'
    })
}