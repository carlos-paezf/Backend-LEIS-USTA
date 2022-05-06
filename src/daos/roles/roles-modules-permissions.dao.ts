import { Permission } from "../../helpers/interfaces";
import { MODULES_FIELDS, PERMISSIONS_FIELDS } from "../../helpers/mapping";
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
        permission.id_rol ? permission.id_rol : permission.id_rol = Number(roleId) 
    })

    const rolesModulesPermissions = await RolesModulosPermisos.bulkCreate(permissions, {
        returning: [ MODULES_FIELDS.ID, PERMISSIONS_FIELDS.ID ]
    })

    return rolesModulesPermissions
}