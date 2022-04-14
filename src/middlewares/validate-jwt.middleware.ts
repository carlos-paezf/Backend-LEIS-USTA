import 'dotenv/config'
import { NextFunction, Request, Response } from "express";
import { red } from 'colors';
import { verify } from 'jsonwebtoken';


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
        if (!authorization) return res.status(401).json({
            ok: false,
            msg: 'Se debe proveer un Token de acceso'
        })
        try {
            const token = authorization.split(' ').at(-1) as string
            const SECRET_KEY = process.env.SECRET_KEY_JWT
            if (!SECRET_KEY) return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
            const data = verify(token, SECRET_KEY)
            req.body.jwtPayload = data
            next()
        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'JWT invalido'
            })
        }
    } catch (error) {
        console.log(red('Error in validateJWT: '), error)
        return res.status(500).json({
            ok: false,
            msg: 'Comuníquese con el Administrador'
        })
    }
}