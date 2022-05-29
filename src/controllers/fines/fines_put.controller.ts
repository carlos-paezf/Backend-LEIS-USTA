import { Request, Response } from "express";
import { FinesDAO_PUT } from "../../daos/fines";

/**
 * @author Sergio Gil
 */
class FinesController_PUT extends FinesDAO_PUT {
    /**
     * @param {Request} req - Request - This is the request object that contains the request data.
     * @param {Response} res - Response -&gt; this is the response object that is passed to the
     * function
     */
    public updateFinesById = (req: Request, res: Response): void => {
        const { finesId } = req.params
        FinesDAO_PUT.updateFinesById({ finesId, ...req.body }, res)
    }
}

export const finesControllerPut = new FinesController_PUT()