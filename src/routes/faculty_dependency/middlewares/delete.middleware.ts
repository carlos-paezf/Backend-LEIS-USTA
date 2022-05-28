import { MODULES, PERMISSIONS } from '../../../helpers/enums';
import { validateRolFromDB } from '../../../middlewares';
import { validateJWT } from '../../../middlewares/validate-jwt.middleware';

export class FacultyDependencyMiddlewareDELETE {
    public static DELETE_DESTROY = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_dependency, PERMISSIONS.update),
    ]
}