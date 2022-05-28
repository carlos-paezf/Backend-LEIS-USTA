import { body } from "express-validator";
import { facultyDependencyNameAlreadyUsed } from "../../../handlers/db-validators.handler";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { FACULTY_DEPENDENCY_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


export class FacultyDependencyMiddlewarePUT {
    public static PUT_ENABLE = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_dependency, PERMISSIONS.update)
    ]
    
    public static PUT_UPDATE = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_dependency, PERMISSIONS.update),
        body([
            FACULTY_DEPENDENCY_FIELDS.ID, FACULTY_DEPENDENCY_FIELDS.NAME,
        ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
        body(FACULTY_DEPENDENCY_FIELDS.NAME).optional().custom(facultyDependencyNameAlreadyUsed),
        validateFieldsErrors
    ]
}