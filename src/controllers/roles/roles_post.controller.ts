import { Request, Response } from 'express';
import { RolesDAO_POST } from '../../daos/roles';


/**
 * This class is a controller that uses the RolesDAO_POST class to create a role.
 * 
 * @author Carlos Páez
 */
class RolesController_POST extends RolesDAO_POST {
    /**
     * CreateRole is a function that takes a Request and a Response and returns nothing.
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public createRole = (req: Request, res: Response) => {
        RolesDAO_POST.createRole({ ...req.body }, res)
    }
}


export const rolesControllerPost = new RolesController_POST()