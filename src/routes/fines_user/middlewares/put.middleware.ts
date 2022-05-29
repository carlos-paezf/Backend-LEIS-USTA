import { body } from "express-validator";
import { finesUserNameAlreadyUsed } from "../../../handlers/db-validators.handler";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FINES_USER_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";

/**
 * This class contains the middleware for the PUT method of the UserController 
 * 
 */
export class FinesUserMiddlewarePUT {
    public static PUT_ENABLE = [
        validateJWT,
        validateRolFromDB(MODULES.fines_user, PERMISSIONS.update)
    ]
    
    public static PUT_UPDATE = [
        validateJWT,
        validateRolFromDB(MODULES.fines_user, PERMISSIONS.update),
        body([
            FINES_USER_FIELDS.ID, FINES_USER_FIELDS.DOCUMENT,
        ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
        body(FINES_USER_FIELDS.DOCUMENT).optional().custom(finesUserNameAlreadyUsed),
        validateFieldsErrors
    ]
}