import { NextFunction, Request, Response } from "express"
import { Modulos, Permisos, RolesModulosPermisos} from "../models";
import { MODULES_FIELDS, PERMISSIONS_FIELDS } from '../helpers/mapping';
import { internalServerErrorStatus, unauthorizedStatus } from "../daos/status_responses";


/**
 * In this middleware we receive the module identifier and the permission, 
 * to be able to check in the database if the role that is in the JWT has 
 * the requested permission on the requested role.
 * 
 * @param {number} module - Module primary key
 * @param {number} permission - Permission primary key
 * @returns 
 */
export const validateRolFromDB = (module: number, permission: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { jwtPayload } = req.body
            if (!jwtPayload) return internalServerErrorStatus('Error in validateRolFromDB: ', 'The jwtPayload is not found in the req.body', res)

            const { role } = jwtPayload
            if (!role) return internalServerErrorStatus('Error in validateRolFromDB: ', 'The role is not found in the jwtPayload', res)

            const moduleDB = await Modulos.findByPk(module, { attributes: [MODULES_FIELDS.ID] })
            if (!moduleDB) return internalServerErrorStatus('Error in validateRolFromDB: ', 'The specified role does not exist', res)

            const permissionDB = await Permisos.findByPk(permission, { attributes: [PERMISSIONS_FIELDS.ID] })
            if (!permissionDB) return internalServerErrorStatus('Error in validateRolFromDB: ', 'The specified permission does not exist', res)

            const roleModulePermission = await RolesModulosPermisos.findOne({
                where: {
                    'id_rol': role,
                    'id_modulo': module,
                    'id_permiso': permission
                }
            })

            if (!roleModulePermission) return unauthorizedStatus('No cuenta con los permisos adecuados para realizar la acción', res)

            next()
        } catch (error) {
            return internalServerErrorStatus('Error in validateRolFromDB: ', error, res)
        }
    }
}