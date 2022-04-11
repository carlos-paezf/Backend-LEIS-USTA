import { Router } from "express";
import { check } from "express-validator";
import { userControllerDelete, userControllerGet, userControllerPost, userControllerPut } from "../controllers/users";
import { documentAlreadyUsed, emailAlreadyUsed } from "../helpers";
import { validateFieldsErrors } from '../middlewares/validate-fields.middleware';


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
        this.userRoutes.get('/', userControllerGet.getAllUsers)
        this.userRoutes.get('/:document', userControllerGet.getUserByDocument)

        this.userRoutes.post('/create', [
            check('document', 'El documento es obligatorio').not().isEmpty(),
            check('first_name', 'El nombre es obligatorio').not().isEmpty(),
            check('last_name', 'El apellido es obligatorio').not().isEmpty(),
            check('email', 'El correo es obligatorio').not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').isEmail(),
            check('document').custom(documentAlreadyUsed),
            check('email').custom(emailAlreadyUsed),
            validateFieldsErrors
        ], userControllerPost.createUser)

        this.userRoutes.put('/update/:document', [
            check(['first_name', 'last_name', 'email'], 'No se pueden enviar campos vacíos').not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').isEmail(),
            check('email').custom(emailAlreadyUsed),
            validateFieldsErrors
        ], userControllerPut.updateUserByDocument)

        this.userRoutes.put('/enable/:document', userControllerPut.enableUserByDocument)
        this.userRoutes.delete('/disable/:document', userControllerDelete.disableUserByDocument)
    }
}


const userRoutes = new UserRoutes()
export default userRoutes.userRoutes