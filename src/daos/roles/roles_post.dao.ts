import { Response } from "express";
import { Modulos, Permisos, Roles, RolesModulosPermisos } from "../../models";
import { MODULES_FIELDS, PERMISSIONS_FIELDS, ROLES_FIELDS, ROLE_MODULE_PERMISSION_FIELDS } from "../../helpers/mapping";
import { createdStatus, internalServerErrorStatus } from "../status_responses";
import { ParamsRoleDAO_POST } from "../../helpers/interfaces";
import { createRolesModulesPermissions } from "./roles-modules-permissions.dao";


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
     * 
     * @param {any} params - {
     * @param {Response} res - Response
     * @returns The role and the permissions
     */
    protected static createRole = async (params: ParamsRoleDAO_POST, res: Response) => {
        try {
            const { rol_nombre, rol_descripcion, permisos } = params

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

            await createRolesModulesPermissions(role.id_rol, permisos)

            const { rows } = await RolesModulosPermisos.findAndCountAll({
                attributes: [ ROLE_MODULE_PERMISSION_FIELDS.PERMISSION],
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

            return createdStatus({ role, permissions: rows }, res)
        } catch (error) {
            return internalServerErrorStatus('Error un RolesDAO_POST: ', error, res)
        }
    }
}