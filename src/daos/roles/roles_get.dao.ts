import { Response } from 'express';
import { Modulos, Permisos, Roles, RolesModulosPermisos } from '../../models';
import { MODULES_FIELDS, PERMISSIONS_FIELDS, ROLES_FIELDS, ROLE_MODULE_PERMISSION_FIELDS } from '../../helpers/mapping';
import { badRequestStatus, internalServerErrorStatus, okStatus } from '../status_responses';
import { ParamsRoleDAO_GETAll, ParamsRoleDAO_GETByID } from '../../helpers/interfaces';


/**
 * Get roles data from the database.
 * 
 * @author Carlos Páez
 */
export class RolesDAO_GET {
    /**
     * It get all roles from the database, and returns then in a JSON response
     * 
     * @param {any} params - { from: 9, limit: 10 }
     * @param {Response} res - Response 
     * @returns The response object
     */
    protected static getAllRoles = async (params: ParamsRoleDAO_GETAll, res: Response): Promise<unknown> => {
        try {
            const { from: offset, limit } = params
            if (offset < 0 || limit < 1) return badRequestStatus('El valor mínimo de from es 0, y el mínimo de limit es 1', res)

            const { count, rows } = await Roles.findAndCountAll({
                offset, limit,
                attributes: [
                    ROLES_FIELDS.ID,
                    ROLES_FIELDS.NAME,
                    ROLES_FIELDS.DESCRIPTION
                ],
                where: { status: true }
            })

            return okStatus({ from: offset, limit, count, data: rows }, res)

        } catch (error) {
            return internalServerErrorStatus('Error in RolesDAO_GET: ', error, res)
        }
    }


    /**
     * This method obtains all the permissions that a specific role has.
     * 
     * @param {any} params - Role ID
     * @param {Response} res - Response 
     * @returns An object that contains the modules to which you have access, 
     * and the permissions on them.
     */
    protected static getRolePermissionsById = async (params: ParamsRoleDAO_GETByID, res: Response): Promise<unknown> => {
        try {
            const { roleId: role_id } = params

            const role = await Roles.findByPk(role_id, {
                attributes: [ROLES_FIELDS.ID, ROLES_FIELDS.NAME, ROLES_FIELDS.STATUS]
            })
            if (!role) return badRequestStatus(`No hay ningún rol con el id ${role_id}`, res)

            if (!role.status) return badRequestStatus(`El rol '${role.rol_nombre}' se encuentra deshabilitado`, res)

            const { count: countPermissions, rows } = await RolesModulosPermisos.findAndCountAll({
                attributes: [
                    ROLE_MODULE_PERMISSION_FIELDS.MODULE,
                    ROLE_MODULE_PERMISSION_FIELDS.PERMISSION
                ],
                where: { id_rol: role_id },
                include: [
                    {
                        model: Modulos,
                        attributes: [MODULES_FIELDS.NAME, MODULES_FIELDS.DESCRIPTION]
                    },
                    {
                        model: Permisos,
                        attributes: [PERMISSIONS_FIELDS.NAME, PERMISSIONS_FIELDS.DESCRIPTION]
                    }
                ]
            })

            if (countPermissions === 0) return badRequestStatus(`El rol identificado con el id ${role_id}, no cuenta con ningún permiso`, res)

            return okStatus({ role, countPermissions, permissions: rows }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in RoleDAO_GET: ', error, res)
        }
    }
}