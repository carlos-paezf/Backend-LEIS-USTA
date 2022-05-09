import { body } from "express-validator";
import { facultyDependencyNameAlreadyUsed } from "../../../handlers/db-validators.handler";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FACULTY_DEPENDENCY_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


/**
 * This class contains an array of middleware functions that will be executed in order 
 * when the POST route is called 
 * 
 * @author Carlos Páez
 */
export class FacultyDependencyMiddlewarePOST {
    public static POST_CREATE = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_dependency, PERMISSIONS.create),
        body(FACULTY_DEPENDENCY_FIELDS.NAME, 'No se pueden enviar campos vacíos').not().isEmpty(),
        body(FACULTY_DEPENDENCY_FIELDS.NAME).custom(facultyDependencyNameAlreadyUsed),
        validateFieldsErrors
    ]
}