import { Request, Response } from "express";
import { RolesDAO_PUT } from "../../daos/roles";


/**
 * This class is a controller that extends the RolesDAO_PUT class, and it has a method 
 * called updateRoleById that takes in a request and a response, and it calls the updateRolById 
 * method from the RolesDAO_PUT class, passing in the roleId from the request params, 
 * and the body of the request. 
 * 
 * @author Carlos Páez
 */
class RolesController_PUT extends RolesDAO_PUT {
    /**
     * This function updates a role by its id, and it takes the roleId from the request params, and the
     * rest of the body from the request body.
     * 
     * @param {Request} req - Request - This is the request object that contains the request data.
     * @param {Response} res - Response -&gt; this is the response object that is passed to the
     * function
     */
    public updateRoleById = (req: Request, res: Response): void => {
        const { roleId } = req.params
        RolesDAO_PUT.updateRolById({ roleId, ...req.body }, res)
    }
}


export const rolesControllerPut = new RolesController_PUT()