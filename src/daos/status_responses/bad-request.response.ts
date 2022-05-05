import { Response } from "express";


/**
 * It takes a string and a response object, and returns a response object with a status of 400 and a
 * message
 * @param {string} msg - string - The message you want to send back to the user
 * @param {Response} res - Response - this is the response object from express
 * @returns A function that takes a string and a response object and returns a response object.
 * 
 * @author Carlos Páez
 */
export const badRequestStatus = (msg: string, res: Response): Response<unknown> => {
    return res.status(400).json({
        ok: false,
        msg
    })
}