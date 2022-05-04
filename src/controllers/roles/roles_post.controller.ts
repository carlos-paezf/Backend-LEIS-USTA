import { Request, Response } from 'express';
import { RolesDAO_POST } from '../../daos/roles';


class RolesController_POST extends RolesDAO_POST {
    public createRole = (req: Request, res: Response) => {
        RolesDAO_POST.createRole({ ...req.body }, res)
    }
}


export const rolesControllerPost = new RolesController_POST()