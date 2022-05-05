import { Router } from 'express';
import { rolesControllerGet, rolesControllerPost } from '../controllers/roles';
import { MODULES, PERMISSIONS } from '../helpers';
import { validateRolFromDB } from '../middlewares';
import { validateJWT } from '../middlewares/validate-jwt.middleware';
import { validateFieldsErrors } from '../middlewares/validate-fields.middleware';
import { body } from 'express-validator';
import { moduleAndPermissionExists, roleNameAlreadyUsed } from '../handlers';
import { ROLES_FIELDS } from '../helpers/mapping';


/**
 * The RolesRoutes class is a class that contains a Router object that is used to create routes 
 * for the RolesController class.
 * 
 * @author Carlos Páez
 */
class RolesRoutes {
    public rolesRouter: Router

    /**
     * The constructor function is a special function that is called when an object is created 
     * from a class.
     */
    constructor() {
        this.rolesRouter = Router()
        this.config()
    }


    /**
     * A function that is called when the class is instantiated. 
     */
    private config = (): void => {
        this.rolesRouter.get('/', [
            validateJWT,
            validateRolFromDB(MODULES.roles, PERMISSIONS.read)
        ], rolesControllerGet.getAllRoles)
        this.rolesRouter.get('/:roleId', [
            validateJWT,
            validateRolFromDB(MODULES.roles, PERMISSIONS.read)
        ], rolesControllerGet.getRolePermissionsById)

        this.rolesRouter.post('/create', [
            validateJWT,
            validateRolFromDB(MODULES.roles, PERMISSIONS.create),
            body(ROLES_FIELDS.NAME, 'El nombre del rol no puede estar vacío').not().isEmpty(),
            body(ROLES_FIELDS.DESCRIPTION, 'La descripción del rol no puede ser un mensaje vacío').optional().not().isEmpty(),
            body('permissions', 'Debe asignar por lo menos un permiso').not().isEmpty(),
            body(ROLES_FIELDS.NAME).custom(roleNameAlreadyUsed),
            body('permissions').custom(moduleAndPermissionExists),
            validateFieldsErrors,
        ], rolesControllerPost.createRole)
    }
}


const rolesRoutes = new RolesRoutes()
export default rolesRoutes.rolesRouter