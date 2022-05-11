import { body } from "express-validator";
import { moduleAndPermissionExists, roleNameAlreadyUsed } from "../../../handlers";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { ROLES_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";

/** 
 * This class is a collection of middleware functions that are used to validate a 
 * user's role before they can update a role. 
 * 
 * @author Carlos Páez
 */
export class RoleMiddlewarePUT {
    public static PUT_UPDATE = [
        validateJWT,
        validateRolFromDB(MODULES.roles, PERMISSIONS.update),
        body([
            ROLES_FIELDS.NAME, ROLES_FIELDS.DESCRIPTION, ROLES_FIELDS.PERMISSIONS
        ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
        body(ROLES_FIELDS.PERMISSIONS, 'Debe asignar por lo menos un permiso').not().isEmpty(),
        // body(ROLES_FIELDS.NAME).custom(roleNameAlreadyUsed),
        body(ROLES_FIELDS.PERMISSIONS).custom(moduleAndPermissionExists),
        validateFieldsErrors
    ]
}