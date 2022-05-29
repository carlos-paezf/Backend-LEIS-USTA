import { MODULES, PERMISSIONS } from "../../../helpers/enums"
import { validateJWT, validateRolFromDB } from "../../../middlewares"


export class FinesUserMiddlewareGET {
    public static GET_ALL = [
        validateJWT,
        validateRolFromDB(MODULES.fines_user, PERMISSIONS.read)
    ]

    public static GET_FINES_USER = [
        validateJWT,
        validateRolFromDB(MODULES.fines_user, PERMISSIONS.read)
    ]
}