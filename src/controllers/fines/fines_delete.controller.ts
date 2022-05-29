import { Request, Response } from "express"
import { FinesDAO_DELETE } from "../../daos/fines"


class FinesController_DELETE extends FinesDAO_DELETE {
    /**
     * This function takes in a request and a response, and then calls the deleteFinesByID function from the
     * FinesDAO_DELETE file, passing in the finesId from the request params and the response.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */

     public disableFinesByDocument = (req: Request, res: Response): void => {
        const { finesId } = req.params
        FinesDAO_DELETE.deleteFinesByID({ finesId }, res)
    }
    public deleteFinesByID = (req: Request, res: Response) => {
        const { finesId } = req.params
        FinesDAO_DELETE.deleteFinesByID({ finesId }, res)
    }
}
export const finesControllerDelete = new FinesController_DELETE()