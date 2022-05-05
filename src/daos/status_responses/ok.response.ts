import { Response } from "express";


/**
 * This function takes in a data object and a response object, and returns a response object with a
 * status of 200 and a json object with an ok property of true and a data property of the data object
 * passed in.
 * @param {any} data - any -&gt; The data you want to send back to the client
 * @param {Response} res - Response - this is the response object that is passed to the controller
 * function
 * @returns A function that takes two parameters and returns a Response object.
 * 
 * @author Carlos Páez
 */
export const okStatus = (data: any, res: Response): Response<unknown> => {
    return res.status(200).json({
        ok: true,
        data
    })
}