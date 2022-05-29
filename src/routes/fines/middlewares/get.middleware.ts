import { MODULES, PERMISSIONS } from "../../../helpers/enums"
import { validateJWT, validateRolFromDB } from "../../../middlewares"

/**
 * @author Sergio Gil
 */
export class FinesMiddlewareGET {
    public static GET_ALL = [
        validateJWT,
        validateRolFromDB(MODULES.fines, PERMISSIONS.read)
    ]

    public static GET_FINES= [
        validateJWT,
        validateRolFromDB(MODULES.fines, PERMISSIONS.read)
    ]
}