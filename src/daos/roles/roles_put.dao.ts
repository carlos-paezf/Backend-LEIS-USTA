import { Response } from "express"
import { getCurrentDate } from "../../helpers"
import { ParamsRoleDAO_PUT } from "../../helpers/interfaces"
import { ROLES_FIELDS } from "../../helpers/mapping"
import { Roles } from "../../models"
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses"
import { updateRolesModulesPermissions } from "./roles-modules-permissions.dao"


/** 
 * It updates a role by id, and then it updates the permissions associated with that role.
 * 
 * @author Carlos Páez
 */
export class RolesDAO_PUT {
    /**
     * It updates a role by id, and it also updates the permissions of that role
     * 
     * @param {ParamsRoleDAO_PUT} params - ParamsRoleDAO_PUT
     * @param {Response} res - Response
     * @returns The role and the rolesModulesPermissions
     */
    protected static updateRolById = async (params: ParamsRoleDAO_PUT, res: Response): Promise<unknown> => {
        try {
            const { roleId, permisos, ...rest } = params

            const role = await Roles.findByPk(roleId, {
                attributes: [ROLES_FIELDS.ID, ROLES_FIELDS.NAME, ROLES_FIELDS.STATUS]
            })
            if (!role) return badRequestStatus(`No existe un rol con el id ${roleId}`, res)

            if (!role.status) return badRequestStatus(`El rol '${role.rol_nombre}' se encuentra deshabilitado`, res)

            const { countPermissions, rolesModulesPermissions } = await updateRolesModulesPermissions(Number(roleId), permisos)

            await role.update({ ...rest, 'update_at': getCurrentDate() })

            return okStatus({ role, countPermissions, rolesModulesPermissions }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in RolesDAO_PUT: ', error, res)
        }
    }
}