import { body } from "express-validator";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FINES_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";

/**
 * 
 * @author Sergio Gil
 */
export class FinesMiddlewarePOST {
    public static POST_CREATE = [
        validateJWT,
        validateRolFromDB(MODULES.fines, PERMISSIONS.create),
        body(FINES_FIELDS.NAME, 'No se pueden enviar campos vacíos').not().isEmpty(),
        body(FINES_FIELDS.PRICE, 'No se pueden enviar campos vacíos').not().isEmpty(),
        body(FINES_FIELDS.DESCRIPTION, 'La descripción de multa no puede ser un mensaje vacío').not().isEmpty(),
        body(FINES_FIELDS.DATE, 'No se pueden enviar campos vacíos').not().isEmpty(),
        validateFieldsErrors
    ]
}