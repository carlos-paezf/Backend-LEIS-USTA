import { Request, Response } from "express";
import { FinesDAO_POST } from "../../daos/fines";

/** 
 * This class is a controller that takes a request and a response, and then calls the 
 * postFines function in the FinesDAO_POST file, passing in 
 * the request body and the response.
 * 
 * @author Sergio Gil
 */
class FinesController_POST extends FinesDAO_POST {
    /**
     * This function takes a request and a response, and then calls the postFines function in
     * the FinesDAO_POST file, passing in the request body and the response.
     * 
     * @param {Request} req - Request -&gt; this is the request object
     * @param {Response} res 
     */
    public postFines = (req: Request, res: Response): void => {
        FinesDAO_POST.postFines({ ...req.body }, res)
    }
}

export const finesControllerPost = new FinesController_POST()