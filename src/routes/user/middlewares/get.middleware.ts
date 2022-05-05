import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


/**
 * This class is a collection of middleware functions that are used to validate a user's 
 * request to get all users or a single user. 
 * 
 * @author Carlos Páez
 */
export class UserMiddlewareGET {
    public static GET_ALL = [
        validateJWT,
        validateRolFromDB(MODULES.users, PERMISSIONS.read),
        validateFieldsErrors
    ]

    public static GET_DOCUMENT = [
        validateJWT,
        validateRolFromDB(MODULES.users, PERMISSIONS.read)
    ]
}