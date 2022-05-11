import { Response } from "express"
import { getCurrentDate } from "../../helpers"
import { ParamsRoleDAO_DELETE } from "../../helpers/interfaces"
import { ROLES_FIELDS } from "../../helpers/mapping"
import { Roles, RolesModulosPermisos } from "../../models"
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses"


/** 
 * It deletes a role by its ID 
 *
 * @author Carlos Páez
 */
export class RolesDAO_DELETE {
    /**
     * It deletes a role by its ID, and also deletes all the permissions associated with that role
     * 
     * @param {ParamsRoleDAO_DELETE} params - ParamsRoleDAO_DELETE
     * @param {Response} res - Response
     * @returns The return is a function that receives two parameters, the first is an object with the
     * parameters that the function needs to execute, and the second is the response object.
     */
    public static deleteRoleByID = async (params: ParamsRoleDAO_DELETE, res: Response): Promise<unknown> => {
        try {
            const { roleId } = params

            const role = await Roles.findByPk(roleId, {
                attributes: [ROLES_FIELDS.ID, ROLES_FIELDS.NAME, ROLES_FIELDS.STATUS]
            })
            if (!role) return badRequestStatus(`No se encuentra ningún rol con el id ${roleId}`, res)

            const name_rol = role.rol_nombre

            if (!role.status) return badRequestStatus(`El rol '${name_rol}', ya se encuentra deshabilitado`, res)

            await RolesModulosPermisos.update({
                status: false,
                updated_at: getCurrentDate()
            }, {
                where: { 'id_rol': roleId }
            })

            await role.update({
                status: false,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `El rol '${name_rol}' con el id ${roleId}, ha sido eliminado exitosamente` }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in RolesDAO_DELETE', error, res)
        }
    }
}