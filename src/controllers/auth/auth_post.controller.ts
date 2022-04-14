import { Request, Response } from "express";
import { AuthDAO_POST } from "../../daos/auth/auth_post.dao";


/**
 * Controller for sending data in order to log in or register.
 * 
 * @author Carlos Páez
 */
class AuthController_POST extends AuthDAO_POST {
    /**
     * Method to send body data to login function
     * 
     * @param {Request} req - RRequest
     * @param {Response} res - Response
     */
    public loginWithEmailAndPassword = (req: Request, res: Response) => {
        AuthDAO_POST.loginWithEmailAndPassword({...req.body}, res)
    }
}


export const authControllerPost = new AuthController_POST()