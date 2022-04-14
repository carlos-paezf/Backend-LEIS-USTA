import { Router } from "express";
import { check } from "express-validator";
import { userControllerDelete, userControllerGet, userControllerPost, userControllerPut } from "../controllers/users";
import { documentAlreadyUsed, emailAlreadyUsed, roleExists, usernameAlreadyUsed } from "../handlers";
import { MODULES, PERMISSIONS } from "../helpers";
import { validateJWT, validateFieldsErrors, validateRolFromDB } from "../middlewares";


/**
 * The UserRoutes class is a class that contains a Router object that is used to create routes 
 * for the UserController class.
 * 
 * @author Carlos Páez
*/
class UserRoutes {
    public userRoutes: Router

    /**
     * The constructor function is a special function that is called when an object is created 
     * from a class.
     */
    constructor() {
        this.userRoutes = Router()
        this.config()
    }

    /**
     * A function that is called when the class is instantiated. 
     */
    public config = () => {
        this.userRoutes.get('', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.read),
        ], userControllerGet.getAllUsers)
        this.userRoutes.get('/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.read),
        ], userControllerGet.getUserByDocument)

        this.userRoutes.post('/create', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.create),
            check([
                'document', 'type_document',
                'first_name', 'last_name', 'username',
                'email', 'contact_number', 'password'
            ], 'No se pueden enviar campos vacíos').not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').isEmail(),
            check('document').custom(documentAlreadyUsed),
            check('username').custom(usernameAlreadyUsed),
            check('email').custom(emailAlreadyUsed),
            validateFieldsErrors
        ], userControllerPost.createUser)

        this.userRoutes.put('/update/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.update),
            check([
                'role_id', "status_id", 'type_document',
                'first_name', 'last_name', 'username',
                'email', 'contact_number', 'password',
            ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').optional().isEmail(),
            check('username').optional().custom(usernameAlreadyUsed),
            check('email').optional().custom(emailAlreadyUsed),
            check('role_id').optional().custom(roleExists),
            validateFieldsErrors
        ], userControllerPut.updateUserByDocument)

        this.userRoutes.put('/enable/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.update),
        ], userControllerPut.enableUserByDocument)

        this.userRoutes.delete('/disable/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.update),
        ], userControllerDelete.disableUserByDocument)
        this.userRoutes.delete('/remove/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.delete),
        ], userControllerDelete.permanentlyDeleteUserByDocument)
    }
}


const userRoutes = new UserRoutes()
export default userRoutes.userRoutes