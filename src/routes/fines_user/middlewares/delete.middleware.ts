import { MODULES, PERMISSIONS } from '../../../helpers/enums';
import { validateRolFromDB } from '../../../middlewares';
import { validateJWT } from '../../../middlewares/validate-jwt.middleware';


export class FinesUserMiddlewareDELETE {
    
    public static DELETE_DISABLE = [
        validateJWT,
        validateRolFromDB(MODULES.fines_user, PERMISSIONS.update)
    ]

    public static DELETE_DESTROY = [
        validateJWT,
        validateRolFromDB(MODULES.fines_user, PERMISSIONS.update),
    ]
}