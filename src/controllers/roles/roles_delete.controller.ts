import { Request, Response } from "express"
import { RolesDAO_DELETE } from "../../daos/roles"


/**
 * This class is used to delete a role by its ID. 
 * 
 * @author Carlos Páez
 */
class RolesController_DELETE extends RolesDAO_DELETE {
    /**
     * This function takes in a request and a response, and then calls the deleteRoleByID function from the
     * RolesDAO_DELETE file, passing in the roleId from the request params and the response.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public deleteRoleByID = (req: Request, res: Response) => {
        const { roleId } = req.params
        RolesDAO_DELETE.deleteRoleByID({ roleId }, res)
    }
}


export const rolesControllerDelete = new RolesController_DELETE()