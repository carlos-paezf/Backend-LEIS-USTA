import { Request, Response } from "express";
import { FinesDAO_GET } from "../../daos/fines";

/** 
 * 
 * @author Sergio Gil
 */
class FinesController_GET extends FinesDAO_GET {
    /**
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getAllFines = (req: Request, res: Response): void => {
        const { from = 0, limit = 10 } = req.query
        FinesDAO_GET.getAllFines({ from: Number(from), limit: Number(limit) }, res)
    }
    /**
     * This function is a controller that receives a request, calls a DAO function, and sends a response.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getFinesById = (req: Request, res: Response): void => {
        const { finesId } = req.params
        FinesDAO_GET.getFinesById({finesId}, res)
    }
}

export const finesControllerGet = new FinesController_GET()