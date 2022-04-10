import { Router } from "express";
import { userControllerGet } from "../controllers/users";


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
    }
}


const userRoutes = new UserRoutes()
export default userRoutes.userRoutes