import { Response } from "express";


/**
 * It returns a response object with a status of 401 and a json object with a key of ok with a value of
 * false and a key of msg with a value of the msg parameter
 * @param {string} msg - string - The message you want to send back to the user
 * @param {Response} res - Response - this is the response object from express
 * @returns A function that takes a string and a response object and returns a response object.
 * 
 * @author Carlos Páez
 */
export const unauthorizedStatus = (msg: string, res: Response): Response<unknown> => {
    return res.status(401).json({
        ok: false,
        msg
    })
}