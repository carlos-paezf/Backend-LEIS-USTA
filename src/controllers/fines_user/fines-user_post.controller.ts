import { Request, Response } from "express";
import { FinesUserDAO_POST } from "../../daos/fines_user";

/** 
 * This class is a controller that takes a request and a response, and then calls the 
 * postFacultyuser function in the FacultyUserDAO_POST file, passing in 
 * the request body and the response.
 * 
 * @author Carlos Páez, SergioG
 */
class FinesUserController_POST extends FinesUserDAO_POST {
    /**
     * This function takes a request and a response, and then calls the postFinesUsers function in
     * the FinesUsersDAO_POST file, passing in the request body and the response.
     * @param {Request} req - Request -&gt; this is the request object
     * @param {Response} res - Response
     */
    public postFinesUser = (req: Request, res: Response): void => {
        FinesUserDAO_POST.postFinesUser({ ...req.body }, res)
    }
}

export const finesUserControllerPost = new FinesUserController_POST()