import { Request, Response } from "express";
import { FacultyDependencyDAO_POST } from "../../daos/faculty_dependency";


/** 
 * This class is a controller that takes a request and a response, and then calls the 
 * postFacultyDependency function in the FacultyDependencyDAO_POST file, passing in 
 * the request body and the response.
 * 
 * @author Carlos Páez
 */
class FacultyDependencyController_POST extends FacultyDependencyDAO_POST {
    /**
     * This function takes a request and a response, and then calls the postFacultyDependency function in
     * the FacultyDependencyDAO_POST file, passing in the request body and the response.
     * @param {Request} req - Request -&gt; this is the request object
     * @param {Response} res - Response
     */
    public postFacultyDependency = (req: Request, res: Response): void => {
        FacultyDependencyDAO_POST.postFacultyDependency({ ...req.body }, res)
    }
}


export const facultyDependencyControllerPost = new FacultyDependencyController_POST()