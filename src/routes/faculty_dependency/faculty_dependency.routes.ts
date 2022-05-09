import { Router } from "express";
import { facultyDependencyControllerGet, facultyDependencyControllerPost } from "../../controllers/faculty_dependency";
import { FacultyDependencyMiddlewareGET, FacultyDependencyMiddlewarePOST } from "./middlewares";


/** 
 * This class is a router that handles all the requests that are related to 
 * the facultyDependency model.
 * 
 * @author Carlos Páez
 */
class FacultyDependencyRouter {
    public facultyDependencyRouter: Router

    /**
     * The constructor function is a special function that is called when an object is created 
     * from a class.
     */
    constructor() {
        this.facultyDependencyRouter = Router()
        this.config()
    }

    /**
     * A function that is called when the class is instantiated. 
     */
    private config = (): void => {
        this.facultyDependencyRouter.get('/', FacultyDependencyMiddlewareGET.GET_ALL, facultyDependencyControllerGet.getAllFacultiesDependencies)
        this.facultyDependencyRouter.get('/:facultyDependencyId', FacultyDependencyMiddlewareGET.GET_FACULTY_DEPENDENCY, facultyDependencyControllerGet.getFacultyDependencyById)

        this.facultyDependencyRouter.post('/create', FacultyDependencyMiddlewarePOST.POST_CREATE, facultyDependencyControllerPost.postFacultyDependency)
    }
}


const facultyDependencyRoutes = new FacultyDependencyRouter()
export default facultyDependencyRoutes.facultyDependencyRouter