import { Request, Response } from "express";
import { FacultyUserDAO_POST } from "../../daos/faculty_user";

/** 
 * This class is a controller that takes a request and a response, and then calls the 
 * postFacultyuser function in the FacultyUserDAO_POST file, passing in 
 * the request body and the response.
 * 
 * @author Carlos Páez, SergioG
 */
class FacultyUserController_POST extends FacultyUserDAO_POST {
    /**
     * @param {Request} req - Request -&gt; this is the request object
     * @param {Response} res - Response
     */
    public postFacultyUser = (req: Request, res: Response): void => {
        FacultyUserDAO_POST.postFacultyUser({ ...req.body }, res)
    }
}

export const facultyUserControllerPost = new FacultyUserController_POST()