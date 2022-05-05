import { Response } from "express";


/**
 * It takes in a data object and a response object, and returns a response object with a status of 201
 * and a json object with an ok property of true and a data property of the data object passed in
 * @param {any} data - any -&gt; The data that you want to send back to the client.
 * @param {Response} res - Response - This is the response object that is passed to the function.
 * @returns A function that takes two parameters and returns a Response object.
 * 
 * @author Carlos Páez
 */
export const createdStatus = (data: any, res: Response): Response<unknown> => {
    return res.status(201).json({
        ok: true,
        data
    })
}