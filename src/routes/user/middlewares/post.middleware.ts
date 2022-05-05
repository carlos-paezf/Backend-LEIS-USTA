import { body } from "express-validator";
import { documentAlreadyUsed, emailAlreadyUsed, usernameAlreadyUsed } from "../../../handlers";
import { MODULES, PERMISSIONS } from "../../../helpers/enums";
import { USERS_FIELDS } from "../../../helpers/mapping";
import { validateFieldsErrors, validateJWT, validateRolFromDB } from "../../../middlewares";


/** 
 * This class contains a static array of middleware functions that will be executed 
 * in order when the POST /users route is called.
 * 
 * @author Carlos Páez
 */
export class UserMiddlewarePOST {
    public static POST_CREATE = [
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
    ]
}