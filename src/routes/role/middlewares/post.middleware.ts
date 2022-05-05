import { body } from "express-validator";
import { moduleAndPermissionExists, roleNameAlreadyUsed } from "../../../handlers";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { ROLES_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


/** 
 * It's a class that contains a static array of functions that are used as middleware 
 * for a POST request.
 * 
 * @author Carlos Páez
 */
export class RoleMiddlewarePOST {
    public static POST_CREATE = [
        validateJWT,
        validateRolFromDB(MODULES.roles, PERMISSIONS.create),
        body(ROLES_FIELDS.NAME, 'El nombre del rol no puede estar vacío').not().isEmpty(),
        body(ROLES_FIELDS.DESCRIPTION, 'La descripción del rol no puede ser un mensaje vacío').optional().not().isEmpty(),
        body('permissions', 'Debe asignar por lo menos un permiso').not().isEmpty(),
        body(ROLES_FIELDS.NAME).custom(roleNameAlreadyUsed),
        body('permissions').custom(moduleAndPermissionExists),
        validateFieldsErrors
    ]
}