import { Request, Response } from "express";
import { UserDAO_POST } from "../../daos/users";


/**
 * This class is a controller that takes in a request and a response, and then passes the 
 * request body to the createUser function in the UserDAO_POST class, which then returns a response 
 * 
 * @author Carlos Páez
 */
class UserController_POST extends UserDAO_POST {
    /**
     * This function takes in a request and a response, and then passes the request body to the
     * createUser function in the UserDAO_POST class, which then returns a response.
     * 
     * @param {Request} req - Request - This is the request object that is passed to the function.
     * @param {Response} res - Response - This is the response object that will be sent back to the
     * client.
     */
    public createUser = (req: Request, res: Response): void => {
        UserDAO_POST.createUser({ ...req.body }, res)
    }
}


export const userControllerPost = new UserController_POST()