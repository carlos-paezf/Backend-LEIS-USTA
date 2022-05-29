import { Request, Response } from "express";
import { FinesUserDAO_PUT } from "../../daos/fines_user";

class FinesUserController_PUT extends FinesUserDAO_PUT {
    /**
     * @param {Request} req - Request - This is the request object that contains the request data.
     * @param {Response} res - Response -&gt; this is the response object that is passed to the
     * function
     */
    public updateFinesUserById = (req: Request, res: Response): void => {
        const { finesUserId } = req.params
        FinesUserDAO_PUT.updateFinesUserById({ finesUserId, ...req.body }, res)
    }
}

export const finesUserControllerPut = new FinesUserController_PUT()