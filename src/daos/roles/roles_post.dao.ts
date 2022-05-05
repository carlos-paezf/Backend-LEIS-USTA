import { Response } from "express";
import { red } from 'colors';
import { Modulos, Permisos, Roles, RolesModulosPermisos } from "../../models";
import { MODULES_FIELDS, PERMISSIONS_FIELDS, ROLES_FIELDS, ROLE_MODULE_PERMISSION_FIELDS } from "../../helpers/mapping";


/** 
 * It creates a role, then it creates a relationship between the role and the 
 * permissions that were sent in the request.
 * 
 * @author Carlos Páez
 */
export class RolesDAO_POST {
    /**
     * It creates a role, then it creates a relationship between the role and the permissions that were
     * sent in the request.
     * @param {any} params - {
     * @param {Response} res - Response
     * @returns The role and the permissions
     */
    protected static createRole = async (params: any, res: Response) => {
        try {
            const { rol_nombre, rol_descripcion, permissions } = params

            const role = await Roles.create({
                rol_nombre,
                rol_descripcion,
                created_at: new Date(),
                updated_at: new Date()
            }, {
                returning: [
                    ROLES_FIELDS.ID, ROLES_FIELDS.NAME, ROLES_FIELDS.DESCRIPTION
                ]
            })

            for (const modPer of permissions) {
                await RolesModulosPermisos.create({
                    'id_rol': role.id_rol,
                    'id_modulo': modPer.id_modulo,
                    'id_permiso': modPer.id_permiso,
                })
            }

            const { rows } = await RolesModulosPermisos.findAndCountAll({
                attributes: [ROLE_MODULE_PERMISSION_FIELDS.ID, ROLE_MODULE_PERMISSION_FIELDS.PERMISSION],
                where: {
                    'id_rol': +role.id_rol
                },
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

            return res.status(201).json({
                ok: true,
                role,
                permissions: rows
            })
        } catch (error) {
            console.log(red('Error un RolesDAO_POST: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}