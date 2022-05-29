import { Request, Response } from "express"
import { FinesUserDAO_DELETE } from "../../daos/fines_user"

class FinesUserController_DELETE extends FinesUserDAO_DELETE {
    /** 
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    
     public disableFinesUserByDocument = (req: Request, res: Response): void => {
        const { finesUserId } = req.params
        FinesUserDAO_DELETE.deleteFinesUserByID({ finesUserId }, res)
    }
    public deleteFinesUserByID = (req: Request, res: Response) => {
        const { finesUserId } = req.params
        FinesUserDAO_DELETE.deleteFinesUserByID({ finesUserId }, res)
    }
}
export const finesUserControllerDelete = new FinesUserController_DELETE()