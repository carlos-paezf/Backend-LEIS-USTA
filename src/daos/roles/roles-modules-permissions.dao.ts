import { getCurrentDate } from "../../helpers";
import { Permission } from "../../helpers/interfaces";
import {  ROLE_MODULE_PERMISSION_FIELDS } from "../../helpers/mapping";
import { RolesModulosPermisos } from "../../models";


/**
 * It takes an array of objects, and creates a new row in the database for each object in the array.
 * 
 * @param {number} roleId - number; The id of the role that is being created
 * @param {any} permissions
 * @returns An array of objects 
 * 
 * @author Carlos Páez
 */
export const createRolesModulesPermissions = async (roleId: number, permissions: any) => {
    permissions.forEach((permission: Permission) => { 
        permission.id_rol ?? (permission.id_rol = Number(roleId))
        permission.status ?? (permission.status = true)
        permission.created_at ?? (permission.created_at = getCurrentDate())
        permission.updated_at ?? (permission.updated_at = getCurrentDate())
    })

    const rolesModulesPermissions = await RolesModulosPermisos.bulkCreate(permissions, {
        ignoreDuplicates: true,
        returning: [ 
            ROLE_MODULE_PERMISSION_FIELDS.ROLE, 
            ROLE_MODULE_PERMISSION_FIELDS.PERMISSION, 
            ROLE_MODULE_PERMISSION_FIELDS.MODULE 
        ]
    })

    return rolesModulesPermissions
}


/**
 * It updates the status of all the records in the table to false, then it creates new records with the
 * new permissions, then it updates the status of the records that were created to true.
 * 
 * @param {number} roleId - number
 * @param {any} permissions
 * @returns an object with two properties: rolesModulesPermissions and count.
 * 
 * @author Carlos Páez
 */
export const updateRolesModulesPermissions = async (roleId: number, permissions: any) => {
    await RolesModulosPermisos.update({
        status: false,
        updated_at: getCurrentDate()
    }, {
        where: { id_rol: roleId }
    })

    const rolesModulesPermissions = await createRolesModulesPermissions(Number(roleId), permissions)

    for (const modPer of permissions) {
        const { id_modulo, id_permiso } = modPer
        await RolesModulosPermisos.update({
            status: true,
            updated_at: getCurrentDate()
        }, {
            where: { id_rol: roleId, id_modulo, id_permiso, status: false }
        })
    }

    const { count } = await RolesModulosPermisos.findAndCountAll({
        attributes: [
            ROLE_MODULE_PERMISSION_FIELDS.ROLE, 
            ROLE_MODULE_PERMISSION_FIELDS.MODULE, 
            ROLE_MODULE_PERMISSION_FIELDS.PERMISSION
        ],
        where: { id_rol: roleId, status: true }
    })

    return { rolesModulesPermissions, countPermissions: count }
}