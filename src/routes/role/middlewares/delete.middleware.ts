import { MODULES, PERMISSIONS } from '../../../helpers/enums';
import { validateRolFromDB } from '../../../middlewares';
import { validateJWT } from '../../../middlewares/validate-jwt.middleware';


/** 
 * This class is a collection of middleware functions that are used to validate a 
 * user's role before they can delete a role. 
 * 
 * @author Carlos Páez
 */
export class RoleMiddlewareDELETE {
    public static DELETE_DESTROY = [
        validateJWT,
        validateRolFromDB(MODULES.roles, PERMISSIONS.update),
    ]
}