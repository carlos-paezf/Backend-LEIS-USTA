import { Request, Response } from "express";
import { UsersDAO_GET } from "../../daos/users";


/**
 * It's a class that has two functions that call two functions from another class
 * 
 * @author Carlos Páez
 */
class UserController_GET extends UsersDAO_GET {
    /**
     * This function gets all users from the database.
     * @param {Request} req - Request; The request object
     * @param {Response} res - Response; this is the response object from express
     */
    public getAllUsers = (req: Request, res: Response): void => {
        const { from = 0, limit = 10, all = false } = req.query
        UsersDAO_GET.getAllUsers(
            {
                from: Number(from),
                limit: Number(limit),
                all: Boolean(all)
            }, res)
    }


    /**
     * This function gets a user by document from the database and returns it to the user.
     * @param {Request} req - Request; The request object
     * @param {Response} res - Response; this is the response object that will be sent to the
     *  client
     */
    public getUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        UsersDAO_GET.getUserByDocument({ document }, res)
    }
}


export const userControllerGet = new UserController_GET()