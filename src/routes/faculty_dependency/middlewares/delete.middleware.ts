import { MODULES, PERMISSIONS } from '../../../helpers/enums';
import { validateRolFromDB } from '../../../middlewares';
import { validateJWT } from '../../../middlewares/validate-jwt.middleware';

/**
 * 
 * @author Sergio Gil
 */
export class FacultyDependencyMiddlewareDELETE {
    public static DELETE_DESTROY = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_dependency, PERMISSIONS.update),
    ]
}