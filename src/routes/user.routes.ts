import { Router } from "express";
import { body } from 'express-validator';
import { userControllerDelete, userControllerGet, userControllerPost, userControllerPut } from "../controllers/users";
import { documentAlreadyUsed, emailAlreadyUsed, roleExists, usernameAlreadyUsed } from "../handlers";
import { MODULES, PERMISSIONS } from "../helpers";
import { USERS_FIELDS } from "../helpers/mapping";
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
    private config = () => {
        this.userRoutes.get('', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.read),
            validateFieldsErrors
        ], userControllerGet.getAllUsers)
        this.userRoutes.get('/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.read),
        ], userControllerGet.getUserByDocument)

        this.userRoutes.post('/create', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.create),
            body([
                USERS_FIELDS.DOCUMENT, USERS_FIELDS.TYPE_DOCUMENT,
                USERS_FIELDS.FIRST_NAME, USERS_FIELDS.LAST_NAME, USERS_FIELDS.USERNAME,
                USERS_FIELDS.EMAIL, USERS_FIELDS.CONTACT_NUMBER, USERS_FIELDS.PASSWORD
            ], 'No se pueden enviar campos vacíos').not().isEmpty(),
            body(USERS_FIELDS.EMAIL, 'Debe ingresar un correo valido').isEmail(),
            body(USERS_FIELDS.DOCUMENT).custom(documentAlreadyUsed),
            body(USERS_FIELDS.EMAIL).custom(emailAlreadyUsed),
            body(USERS_FIELDS.USERNAME).custom(usernameAlreadyUsed),
            validateFieldsErrors
        ], userControllerPost.createUser)

        this.userRoutes.put('/update/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.update),
            body([
                USERS_FIELDS.ROLE, USERS_FIELDS.TYPE_DOCUMENT,
                USERS_FIELDS.FIRST_NAME, USERS_FIELDS.LAST_NAME, USERS_FIELDS.USERNAME,
                USERS_FIELDS.EMAIL, USERS_FIELDS.CONTACT_NUMBER, USERS_FIELDS.PASSWORD, USERS_FIELDS.STATUS,
            ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
            body(USERS_FIELDS.EMAIL, 'Debe ingresar un correo valido').optional().isEmail(),
            body(USERS_FIELDS.USERNAME).optional().custom(usernameAlreadyUsed),
            body(USERS_FIELDS.EMAIL).optional().custom(emailAlreadyUsed),
            body(USERS_FIELDS.ROLE).optional().custom(roleExists),
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