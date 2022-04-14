# Generate Json Web Token

La función para generar el JWT toma por parámetros los datos que se van a añadir al payload del token. El método retorna una promesa en la que se toma la firma secreta de las variables de entorno y por último se le añade el tiempo en el que expira el token. Si todo va bien, se resuelve el token.

```ts
import 'dotenv/config'
import { sign } from "jsonwebtoken"
import { red } from 'colors';

const SECRET_KEY = process.env.SECRET_KEY_JWT

export const generateJWT = (data: {} = {}) => {
    return new Promise((resolve, reject) => {
        const payload = { ...data }
        sign(payload, SECRET_KEY!, {
            expiresIn: '2h',
        }, (error, token) => {
            if (error) {
                console.log(red('Error in generateJWT: '), error)
                reject('No se pudo generar un JWT')
            } else {
                resolve(token)
            }
        })
    })
}
```
