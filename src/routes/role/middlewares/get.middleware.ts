import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { validateJWT, validateRolFromDB } from "../../../middlewares";


/**
 * This class is a collection of middleware functions that are used to validate 
 * the user's role and permission to access the requested resource.
 * 
 * @author Carlos Páez
 */
export class RoleMiddlewareGET {
    public static GET_ALL = [
        validateJWT,
        validateRolFromDB(MODULES.roles, PERMISSIONS.read)
    ]

    public static GET_ROLE = [
        validateJWT,
        validateRolFromDB(MODULES.roles, PERMISSIONS.read)
    ]
}