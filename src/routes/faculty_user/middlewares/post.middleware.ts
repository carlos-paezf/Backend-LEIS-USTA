import { body } from "express-validator";
import { facultyUserNameAlreadyUsed } from "../../../handlers/db-validators.handler";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FACULTY_USER_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


/**
 * This class contains an array of middleware functions that will be executed in order 
 * when the POST route is called 
 * EDITAR LOS FACULTAD USUARIO ALREADY
 */
export class FacultyUserMiddlewarePOST {
    public static POST_CREATE = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_user, PERMISSIONS.create),
        body(FACULTY_USER_FIELDS.DOCUMENT, 'No se pueden enviar campos vacíos').not().isEmpty(),
        body(FACULTY_USER_FIELDS.DOCUMENT).custom(facultyUserNameAlreadyUsed),
        validateFieldsErrors
    ]
}