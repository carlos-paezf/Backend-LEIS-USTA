# Validate JWT

Tenemos un middleware que se encarga de validar el JWT que se envía dentro del campo Authorization de los headers de la petición. Si no se provee un token, se envía un error. Si el token está presente, se toma la data una vez verificado el token y se añade al body de la petición. Terminado el proceso, se continua con el siguiente middleware.

```ts
import 'dotenv/config'
import { NextFunction, Request, Response } from "express";
import { red } from 'colors';
import { verify } from 'jsonwebtoken';


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
```
