import { Request, Response } from "express";
import { UserDAO_DELETE } from "../../daos/users";

/**
 * This is the controller of the Delete method
 * 
 * @author Carlos Páez
 */
class UserController_DELETE extends UserDAO_DELETE {
    /**
     * The document of the user to be disabled is taken from the parameters and 
     * delivered to the inherited method. 
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public disableUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        UserDAO_DELETE.disableUserByDocument({ document }, res)
    }


    /**
     * The document of the user to be remove is taken from the parameters and 
     * delivered to the inherited method. 
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public permanentlyDeleteUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        UserDAO_DELETE.permanentlyDeleteUserByDocument({ document }, res)
    }
}


export const userControllerDelete = new UserController_DELETE()