import { body } from "express-validator";
import { facultyUserNameAlreadyUsed } from "../../../handlers/db-validators.handler";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FACULTY_USER_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";

/**
 * This class contains the middleware for the PUT method of the UserController 
 * 
 */
export class FacultyUserMiddlewarePUT {
    public static PUT_ENABLE = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_user, PERMISSIONS.update)
    ]
    
    public static PUT_UPDATE = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_user, PERMISSIONS.update),
        body([
            FACULTY_USER_FIELDS.ID, FACULTY_USER_FIELDS.DOCUMENT,
        ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
        body(FACULTY_USER_FIELDS.DOCUMENT).optional().custom(facultyUserNameAlreadyUsed),
        validateFieldsErrors
    ]
}