import { NextFunction, Request, Response } from "express"
import { Module, Role } from "../models"
import { red } from 'colors';
import { Permission } from '../models/permission.model';
import { RoleModulePermission } from '../models/role_module_permission.model';


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
            if (!jwtPayload) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: JWTValidate' })

            const { role } = jwtPayload
            if (!role) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: JWTRol' })

            const moduleDB = await Module.findByPk(module, { attributes: ['module_id'] })
            if (!moduleDB) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: DBModule' })

            const permissionDB = await Permission.findByPk(permission, { attributes: ['permission_id'] })
            if (!permissionDB) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: DBPermission' })

            const roleModulePermission = await RoleModulePermission.findOne({
                where: {
                    'role_id': role,
                    'module_id': module,
                    'permission_id': permission
                }
            })

            if (!roleModulePermission) return res.status(401).json({ ok: false, msg: 'No cuenta con los permisos adecuados para realizar la acción' })

            next()
        } catch (error) {
            console.log(red('Error in validateRolFromDB: '), error)
            return res.status(500).json({ ok: false, msg: 'Comuníquese con el Administrador' })
        }
    }
}