import 'dotenv/config'
import { sign } from "jsonwebtoken"
import { red } from 'colors';


const SECRET_KEY = process.env.SECRET_KEY_JWT


/**
 * In this function we generate the JWT to be able to access some of the private services.
 * @param {any} data - Data to add to the payload 
 * @returns A promise that the JWT resolves to
 * 
 * @author Carlos Páez
 */
export const generateJWT = (data: any = {}) => {
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