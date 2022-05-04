import { NextFunction, Request, Response } from "express"
import { red } from 'colors';
import { Modulos, Permisos, RolesModulosPermisos} from "../models";
import { MODULES_FIELDS, PERMISSIONS_FIELDS } from '../helpers/mapping';


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
            if (!jwtPayload) return res.status(500).json({ 
                ok: false, 
                msg: 'Comuníquese con el administrador. Error: JWTValidate' 
            })

            const { role } = jwtPayload
            if (!role) return res.status(500).json({ 
                ok: false, 
                msg: 'Comuníquese con el administrador. Error: JWTRol' 
            })

            const moduleDB = await Modulos.findByPk(module, { attributes: [MODULES_FIELDS.ID] })
            if (!moduleDB) return res.status(500).json({ 
                ok: false, 
                msg: 'Comuníquese con el administrador. Error: DBModule' 
            })

            const permissionDB = await Permisos.findByPk(permission, { attributes: [PERMISSIONS_FIELDS.ID] })
            if (!permissionDB) return res.status(500).json({ 
                ok: false, 
                msg: 'Comuníquese con el administrador. Error: DBPermission' 
            })

            const roleModulePermission = await RolesModulosPermisos.findOne({
                where: {
                    'id_rol': role,
                    'id_modulo': module,
                    'id_permiso': permission
                }
            })

            if (!roleModulePermission) return res.status(401).json({ 
                ok: false, 
                msg: 'No cuenta con los permisos adecuados para realizar la acción' 
            })

            next()
        } catch (error) {
            console.log(red('Error in validateRolFromDB: '), error)
            return res.status(500).json({ ok: false, msg: 'Comuníquese con el Administrador' })
        }
    }
}