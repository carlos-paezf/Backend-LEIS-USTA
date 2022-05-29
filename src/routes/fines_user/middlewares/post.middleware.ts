import { body } from "express-validator";
import { finesUserNameAlreadyUsed } from "../../../handlers/db-validators.handler";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FINES_USER_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";

/**
 * This class contains an array of middleware functions that will be executed in order 
 * when the POST route is called 
 * EDITAR LOS MULTA USUARIO ALREADY
 */
export class FinesUserMiddlewarePOST {
    public static POST_CREATE = [
        validateJWT,
        validateRolFromDB(MODULES.fines_user, PERMISSIONS.create),
        body(FINES_USER_FIELDS.DOCUMENT, 'No se pueden enviar campos vacíos').not().isEmpty(),
        body(FINES_USER_FIELDS.DOCUMENT).custom(finesUserNameAlreadyUsed),
        validateFieldsErrors
    ]
}