import { MODULES, PERMISSIONS } from "../../../helpers/enums"
import { validateJWT, validateRolFromDB } from "../../../middlewares"


export class FacultyUserMiddlewareGET {
    public static GET_ALL = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_user, PERMISSIONS.read)
    ]

    public static GET_FACULTY_USER = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_user, PERMISSIONS.read)
    ]
}