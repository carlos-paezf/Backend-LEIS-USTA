import { Router } from "express";
import { facultyUserControllerGet, facultyUserControllerPost } from "../../controllers/faculty_user";
import { FacultyUserMiddlewareGET, FacultyUserMiddlewarePOST  } from "./middlewares";

class FacultyUserRouter {
    public facultyUserRouter: Router
    /**
     * The constructor function is a special function that is called when an object is created 
     * from a class.
     */
    constructor() {
        this.facultyUserRouter = Router()
        this.config()
    }

    /**
     * A function that is called when the class is instantiated. 
     */
    private config = (): void => {
        this.facultyUserRouter.get(
            '/',
            FacultyUserMiddlewareGET.GET_ALL,
            facultyUserControllerGet.getAllFacultiesUsers
        )
        this.facultyUserRouter.get(
            '/:facultyUserId',
            FacultyUserMiddlewareGET.GET_FACULTY_USER,
            facultyUserControllerGet.getFacultyUserById
        )

        this.facultyUserRouter.post(
            '/create',
            FacultyUserMiddlewarePOST.POST_CREATE,
            facultyUserControllerPost.postFacultyUser
        )
    }
}

const facultyuserRoutes = new FacultyUserRouter()
export default facultyuserRoutes.facultyUserRouter