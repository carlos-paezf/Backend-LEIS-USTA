import { red } from 'colors';
import { Response } from 'express';
import { Modulos, Permisos, Roles, RolesModulosPermisos } from '../../models';
import { MODULES_FIELDS, PERMISSIONS_FIELDS, ROLES_FIELDS, ROLE_MODULE_PERMISSION_FIELDS } from '../../helpers/mapping';


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
    protected static getAllRoles = async (params: any, res: Response) => {
        try {
            const { from: offset, limit } = params
            if (offset < 0 || limit < 1) return res.status(400).json({
                ok: false,
                msg: 'El valor mínimo de from es 0, y el mínimo de limit es 1'
            })
            const { count, rows } = await Roles.findAndCountAll({
                offset, limit,
                attributes: [
                    ROLES_FIELDS.ID,
                    ROLES_FIELDS.NAME,
                    ROLES_FIELDS.DESCRIPTION
                ]
            })

            return res.status(200).json({
                ok: true,
                from: offset, limit, count,
                data: rows
            })
        } catch (error) {
            console.log(red('Error in RolesDAO_GET: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
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
    protected static getRolePermissionsById = async (params: any, res: Response) => {
        try {
            const { roleId: role_id } = params
            const role = await Roles.findByPk(role_id, {
                attributes: [ROLES_FIELDS.ID]
            })
            if (!role) return res.status(400).json({
                ok: false,
                msg: `No hay ningún rol con el id ${role_id}`
            })

            const { count, rows } = await RolesModulosPermisos.findAndCountAll({
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

            if (count === 0) return res.status(200).json({
                ok: true,
                msg: `El rol identificado con el id ${role_id}, no cuenta con ningún permiso`
            })

            return res.status(200).json({
                ok: true,
                role_id,
                count,
                data: rows
            })
        } catch (error) {
            console.log(red('Error in RoleDAO_GET: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}