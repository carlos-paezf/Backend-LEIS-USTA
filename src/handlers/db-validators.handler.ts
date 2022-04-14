import { Role, User } from "../models"


/**
 * It checks if a user with the given document already exists in the database. If it does, it throws an
 * error.
 * The function is calles in the following way in the routes: `check('document').custom(documentAlreadyUsed)`
 * 
 * @param {string} document - string
 * 
 * @author Carlos Páez
 */
export const documentAlreadyUsed = async (document: string): Promise<void> => {
    const documentExists = await User.findOne({
        attributes: ['document'],
        where: { document }
    })
    if (documentExists) throw new Error(`Ya existe un usuario con el documento ${document}`)
}


/**
 * "If the email exists, throw an error, otherwise do nothing."
 * The function is called in the following way in the routes: `check('document').custom(documentAlreadyUsed)`
 * 
 * @param {string} email - string
 * 
 * @author Carlos Páez
 */
export const emailAlreadyUsed = async (email: string): Promise<void> => {
    const emailExists = await User.findOne({
        attributes: ['email'],
        where: { email }
    })
    if (emailExists) throw new Error(`Ya existe un usuario con el correo ${email}`)
}


/**
 * "If the username exists, throw an error, otherwise do nothing."
 * The function is called in the following way in the routes: `check('username).custom(usernameAlreadyUsed)`
 * 
 * @param {string} username 
 * 
 * @author Carlos Páez
 */
export const usernameAlreadyUsed = async (username: string): Promise<void> => {
    const usernameExists = await User.findOne({
        attributes: ['username'],
        where: { username }
    })
    if (usernameExists) throw new Error(`Ya existe un usuario con el nombre de usuario ${username}`)
}


/**
 * 
 * @param roleId 
 * 
 * @author Carlos Páez
 */
export const roleExists = async (roleId: any): Promise<any> => {
    const roleExists = await Role.findByPk(roleId, {
        attributes: ['role_id']
    })
    if (!roleExists) throw new Error(`No existe un rol con el id ${roleId}`)
}


/**
 * 
 * @param statusId 
 * 
 * @author Carlos Páez
 */
// export const statusExists = async (statusId: any): Promise<any> => {
//     const statusExists = await Status.findByPk(statusId, {
//         attributes: ['status_id']
//     })
//     if (!statusExists) throw new Error(`No existe un estatus con el id ${statusId}`)
// }