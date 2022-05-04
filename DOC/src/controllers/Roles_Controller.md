# Roles Controller

## GET Controller

Controladores para los métodos GET. El primer método acepta por query la cantidad de elementos a mostrar y desde donde. El siguiente recibe el id del rol para enviarlo al DAO.

```ts
import { Request, Response } from "express";
import { RolesDAO_GET } from "../../daos/roles";

class RolesController_GET extends RolesDAO_GET {
    public getAllRoles = (req: Request, res: Response) => {
        const { from = 0, limit = 10 } = req.query
        RolesDAO_GET.getAllRoles({ from: Number(from), limit: Number(limit) }, res)
    }

    public getRolePermissionsById = (req: Request, res: Response) => {
        const { roleId } = req.params
        RolesDAO_GET.getRolePermissionsById({ roleId: Number(roleId) }, res)
    }
}

export const rolesControllerGet = new RolesController_GET()
```
