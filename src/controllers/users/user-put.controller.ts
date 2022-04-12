import { Request, Response } from "express";
import { UserDAO_PUT } from "../../daos/users";

/**
 * This controller is responsible for passing the parameters to the methods of the UserDAO_PUT class
 * 
 * @author Carlos Páez
 */
class UserController_PUT extends UserDAO_PUT {
    /**
     * This function takes in a request and a response, and then passes te request body to the
     * `updateUserByDocument` function in the UserDAO_PUT class, which then returns a response.
     * 
     * @param {Request} req - Request - This is the request object that is passed to the function
     * @param {Response} res - Response - This is the response object that will be sent back to the client
     */
    public updateUserByDocument = (req: Request, res: Response) => {
        const { document } = req.params
        UserDAO_PUT.updateUserByDocument({ document, ...req.body }, res)
    }

    /**
     * This function takes in a request and response, and then passes the request params to the
     * `enableUserByDocument` function in the UserDAO_PUT class, which the returns a response.
     * 
     * @param {Request} req - Request - This is the response object that is passed to the function
     * @param {Response} res - Response - This is the response object that will be sent back to the client
     */
    public enableUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        UserDAO_PUT.enableUserByDocument({ document }, res)
    }
}


export const userControllerPut = new UserController_PUT()