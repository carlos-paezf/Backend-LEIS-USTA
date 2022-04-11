import { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import { validationResult } from "express-validator";


/**
 * It validates the fields of a request and returns an error if there's any.
 * 
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object
 * @param {NextFunction} next - The next function is a function in the Express router which, when
 * invoked, executes the middleware succeeding the current middleware.
 * @returns The errors object is being returned.
 * 
 * @author Carlos Páez
 */
export const validateFieldsErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({
        ok: false, ...errors
    })
    next()
}