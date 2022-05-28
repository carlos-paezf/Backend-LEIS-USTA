import { MODULES, PERMISSIONS } from '../../../helpers/enums';
import { validateRolFromDB } from '../../../middlewares';
import { validateJWT } from '../../../middlewares/validate-jwt.middleware';


export class FacultyUserMiddlewareDELETE {
    public static DELETE_DISABLE = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_user, PERMISSIONS.update)
    ]

    public static DELETE_DESTROY = [
        validateJWT,
        validateRolFromDB(MODULES.faculty_user, PERMISSIONS.update),
    ]
}