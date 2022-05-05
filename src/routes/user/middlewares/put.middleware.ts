import { body } from "express-validator";
import { emailAlreadyUsed, roleExists, usernameAlreadyUsed } from "../../../handlers";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { USERS_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


/**
 * This class contains the middleware for the PUT method of the UserController 
 * 
 * @author Carlos Páez
 */
export class UserMiddlewarePUT {
    public static PUT_ENABLE = [
        validateJWT,
        validateRolFromDB(MODULES.users, PERMISSIONS.update)
    ]
    
    public static PUT_UPDATE = [
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
    ]
}