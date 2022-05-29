import { MODULES, PERMISSIONS } from '../../../helpers/enums';
import { validateRolFromDB } from '../../../middlewares';
import { validateJWT } from '../../../middlewares/validate-jwt.middleware';

/**
 * 
 * @author Sergio Gil
 */
export class FinesMiddlewareDELETE {
    public static DELETE_DISABLE = [
        validateJWT,
        validateRolFromDB(MODULES.fines, PERMISSIONS.update)
    ]
    public static DELETE_DESTROY = [
        validateJWT,
        validateRolFromDB(MODULES.fines, PERMISSIONS.update),
    ]
}