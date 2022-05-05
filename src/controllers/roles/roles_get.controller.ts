import { Request, Response } from "express";
import { RolesDAO_GET } from "../../daos/roles";


/**
 * This class is a controller that uses the DAO class to get data from the database.
 * 
 * @author Carlos Páez
 */
class RolesController_GET extends RolesDAO_GET {
    /**
     * This function get all roles from the database
     * @param {Request} req - Request: The request object
     * @param {Response} res - Response: This is the response object from express
     */
    public getAllRoles = (req: Request, res: Response) => {
        const { from = 0, limit = 10 } = req.query
        RolesDAO_GET.getAllRoles({ from: Number(from), limit: Number(limit) }, res)
    }


    /**
     * This method obtains all the permissions that a specific role has.
     * @param {Request} req - Request: The request object
     * @param {Response} res - Response: This is the response object from express
     */
    public getRolePermissionsById = (req: Request, res: Response) => {
        const { roleId } = req.params
        RolesDAO_GET.getRolePermissionsById({ roleId: Number(roleId) }, res)
    }
}


export const rolesControllerGet = new RolesController_GET()