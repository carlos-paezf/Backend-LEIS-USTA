import { FacultadDependencia, FacultadUsuarios, Modulos, Multas, MultasUsuarios, Permisos, Roles, Usuarios } from "../models"
import { FINES_FIELDS, FACULTY_DEPENDENCY_FIELDS, FACULTY_USER_FIELDS, MODULES_FIELDS, PERMISSIONS_FIELDS, ROLES_FIELDS, USERS_FIELDS, FINES_USER_FIELDS } from "../helpers/mapping"
import { Permission } from "../helpers/interfaces"

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
    const documentExists = await Usuarios.findOne({
        attributes: [USERS_FIELDS.DOCUMENT],
        where: { 'documento': document }
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
    const emailExists = await Usuarios.findOne({
        attributes: [USERS_FIELDS.EMAIL],
        where: { email }
    })
    if (emailExists) throw new Error(`Ya existe un usuario con el correo ${email}`)
}


/**
 * "If the username exists, throw an error, otherwise do nothing."
 * The function is called in the following way in the routes: `check('username').custom(usernameAlreadyUsed)`
 * 
 * @param {string} username 
 * 
 * @author Carlos Páez
 */
export const usernameAlreadyUsed = async (username: string): Promise<void> => {
    const usernameExists = await Usuarios.findOne({
        attributes: [USERS_FIELDS.USERNAME],
        where: { username }
    })
    if (usernameExists) throw new Error(`Ya existe un usuario con el nombre de usuario ${username}`)
}


/**
 * It checks if a role exists in the database, if it doesn't, it throws an error
 * @param {any} roleId - any
 * 
 * @author Carlos Páez
 */
export const roleExists = async (roleId: string | number): Promise<void> => {
    const roleExists = await Roles.findByPk(roleId, {
        attributes: [ROLES_FIELDS.ID]
    })
    if (!roleExists) throw new Error(`No existe un rol con el id ${roleId}`)
}


/**
 * "If the role name exists, throw an error, otherwise do nothing."
 * The function is called in the following way in the routes: `check('name').custom(roleNameAlreadyUsed)`
 * 
 * @param {string} name - Role name
 * 
 * @author Carlos Páez
 */
export const roleNameAlreadyUsed = async (name: string): Promise<void> => {
    const roleNameExists = await Roles.findOne({
        attributes: [ROLES_FIELDS.NAME],
        where: { rol_nombre: name }
    })
    if (roleNameExists) throw new Error(`Ya existe un rol con el nombre ${name}`)
}


/**
 * It checks if the module and permission exists in the database
 * @param {any[]} modulePermission - any[] = []
 * 
 * @author Carlos Páez
 */
export const moduleAndPermissionExists = async (modulePermission: Permission[] = []): Promise<void> => {
    if (modulePermission.length === 0) throw new Error('Debe asignar por lo menos 1 permiso sobre un módulo')
    for (const modPer of modulePermission) {
        const moduleExists = await Modulos.findByPk(modPer.id_modulo, {
            attributes: [MODULES_FIELDS.ID]
        })
        if (!moduleExists) throw new Error(`No existe ningún módulo con el id ${modPer.id_modulo}`)

        const permissionExists = await Permisos.findByPk(modPer.id_permiso, {
            attributes: [PERMISSIONS_FIELDS.ID]
        })
        if (!permissionExists) throw new Error(`No existe ningún permiso con el id ${modPer.id_permiso}`)
    }
}

/**
 * If a facultyDependency with the given name exists, throw an error
 * @param {string} facultyDependencyName - string
 * 
 * @author Carlos Páez
 */
export const facultyDependencyNameAlreadyUsed = async (facultyDependencyName: string) => {
    const facultyDependencyExists = await FacultadDependencia.findOne({
        attributes: [FACULTY_DEPENDENCY_FIELDS.NAME],
        where: { nombre_facultad_dependencia: facultyDependencyName }
    })
    if (facultyDependencyExists) throw new Error(`Ya existe una Facultad-Dependencia con el nombre ${facultyDependencyName}`)
}
/**
 * @param {string} facultyUserName - string
 * 
 */
export const facultyUserNameAlreadyUsed = async (facultyUserName: string) => {
    const facultyUserExists = await FacultadUsuarios.findOne({
        attributes: [FACULTY_USER_FIELDS.DOCUMENT],
        where: { documento_usuario : facultyUserName }
    })
    if (facultyUserExists) throw new Error(`Ya existe una Facultad-Usuario con el nombre ${facultyUserName}`)
}

/**
 * If a facultyDependency with the given name exists, throw an error
 * @param {string} finesName - string
 */
 export const finesNameAlreadyUsed = async (finesName: string) => {
    const finesExists = await Multas.findOne({
        attributes: [FINES_FIELDS.NAME],
        where: { nombre_multa: finesName }
    })
    if (finesExists) throw new Error(`Ya existe una Multa con el nombre ${finesName}`)
}

/**
 * @param {string} facultyUserName - string
 * 
 */
 export const finesUserNameAlreadyUsed = async (finesUserName: string) => {
    const finesUserExists = await MultasUsuarios.findOne({
        attributes: [FINES_USER_FIELDS.DOCUMENT],
        where: { documento_usuario : finesUserName }
    })
    if (finesUserExists) throw new Error(`Ya existe una Multa-Usuario con el nombre ${finesUserName}`)
}