import { Response } from "express"
import { ParamsRoleDAO_PUT } from "../../helpers/interfaces"
import { ROLES_FIELDS } from "../../helpers/mapping"
import { Roles, RolesModulosPermisos } from "../../models"
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses"
import { createRolesModulesPermissions } from "./roles-modules-permissions.dao"


/** 
 * It updates a role by id, and then it updates the permissions associated with that role.
 * 
 * @author Carlos Páez
 */
export class RolesDAO_PUT {
    /**
     * It receives a roleId, a list of permissions and some other data, it deletes all the permissions
     * associated with the roleId, then it creates the new permissions and updates the role
     * 
     * @param {ParamsRoleDAO_PUT} params - ParamsRoleDAO_PUT
     * @param {Response} res - Response
     * @returns The role and the rolesModulesPermissions
     */
    protected static updateRolById = async (params: ParamsRoleDAO_PUT, res: Response): Promise<unknown> => {
        try {
            const { roleId, permisos, ...rest } = params

            const role = await Roles.findByPk(roleId, {
                attributes: [ROLES_FIELDS.ID]
            })
            if (!role) return badRequestStatus(`No existe un rol con el id ${roleId}`, res)
            
            await RolesModulosPermisos.destroy({ where: { 'id_rol': roleId } })

            const rolesModulesPermissions = await createRolesModulesPermissions(Number(roleId), permisos)

            await role.update({ ...rest, 'update_at': new Date() })

            return okStatus({ role, rolesModulesPermissions }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in RolesDAO_PUT: ', error, res)
        }
    }
}