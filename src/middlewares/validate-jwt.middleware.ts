import 'dotenv/config'
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { internalServerErrorStatus, unauthorizedStatus } from '../daos/status_responses';


/**
 * This function validates the JWT that is sent through the Headers
 * 
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object
 * @param {NextFunction} next - The next function is a function in the Express router which, when
 * invoked, executes the middleware succeeding the current middleware.
 * @returns The errors object is being returned.
 * 
 * @author Carlos Páez
 */
export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers
        if (!authorization) return unauthorizedStatus('Se debe proveer un Token de acceso', res)

        try {
            const bearer = authorization.slice(0, 6)
            if (bearer !== 'Bearer') return unauthorizedStatus('Invalid Authorization', res)

            const token = authorization.split(' ').at(-1) as string
            const SECRET_KEY = process.env.SECRET_KEY_JWT

            if (!SECRET_KEY) return internalServerErrorStatus('Error in validateJWT: ', 'Error in Secret Key', res) 
            
            const data = verify(token, SECRET_KEY)
            req.body.jwtPayload = data

            next()
        } catch (error) {
            return unauthorizedStatus('JWT invalido', res)
        }
    } catch (error) {
        return internalServerErrorStatus('Error in validateJWT: ', error, res)
    }
}