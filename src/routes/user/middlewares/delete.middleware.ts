import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { validateJWT, validateRolFromDB } from "../../../middlewares";


/**
 * This class is a collection of middleware functions that are used to validate the 
 * user's permissions to perform a specific action on a specific resource.
 * 
 * @author Carlos Páez
 */
export class UserMiddlewareDELETE {
    public static DELETE_DISABLE = [
        validateJWT,
        validateRolFromDB(MODULES.users, PERMISSIONS.update)
    ]

    public static DELETE_DESTROY = [
        validateJWT,
        validateRolFromDB(MODULES.users, PERMISSIONS.delete)
    ]
}