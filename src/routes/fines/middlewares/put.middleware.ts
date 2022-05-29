import { body } from "express-validator";
import { finesNameAlreadyUsed } from "../../../handlers/db-validators.handler";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FINES_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


export class FinesMiddlewarePUT {
    public static PUT_ENABLE = [
        validateJWT,
        validateRolFromDB(MODULES.fines, PERMISSIONS.update)
    ]
    
    public static PUT_UPDATE = [
        validateJWT,
        validateRolFromDB(MODULES.fines, PERMISSIONS.update),
        body([
            FINES_FIELDS.ID, FINES_FIELDS.NAME, FINES_FIELDS.PRICE, FINES_FIELDS.DATE, FINES_FIELDS.DESCRIPTION,
            FINES_FIELDS.STATUS
        ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
        body(FINES_FIELDS.NAME).optional().custom(finesNameAlreadyUsed),
        validateFieldsErrors
    ]
}