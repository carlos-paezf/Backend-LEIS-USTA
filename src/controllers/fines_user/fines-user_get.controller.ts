import { Request, Response } from "express";
import { FinesUserDAO_GET } from "../../daos/fines_user";

/** 
 * @author Sergio Gil
 */
class FinesUserController_GET extends FinesUserDAO_GET {
    /**
     * This function gets all fines users from the database and returns them to the client.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getAllFinesUsers = (req: Request, res: Response): void => {
        const { from = 0, limit = 10 } = req.query
        FinesUserDAO_GET.getAllFinesUsers({ from: Number(from), limit: Number(limit) }, res)
    }

    /**
     * This function is a controller that receives a request, calls a DAO function, and sends a response.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getFinesUserById = (req: Request, res: Response): void => {
        const { finesUserId } = req.params
        FinesUserDAO_GET.getFinesUserById({finesUserId}, res)
    }
}

export const finesUserControllerGet = new FinesUserController_GET()