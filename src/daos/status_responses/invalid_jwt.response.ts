import { Response } from "express"


/**
 * This function returns a response with a status of 498 and a json object with a key of ok with a
 * value of false and a key of msg with a value of the msg parameter.
 * @param {string} msg - The message to be sent to the client
 * @param {Response} res - Response - This is the response object that is passed to the middleware
 * function.
 * @returns A function that takes a string and a response object and returns a response object.
 * 
 * @author Carlos Páez
 */
export const invalidExpiredJWTStatus = (msg: string, res: Response): Response<unknown> => {
    return res.status(498).json({ ok: false, msg })
}