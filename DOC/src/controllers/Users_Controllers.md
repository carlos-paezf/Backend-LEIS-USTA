# Users Controllers

Dentro del directorio `controllers` se encuentran diferentes clases que heredan de las clases DAO, y se encargan de manejar los elementos que ingresan desde el request, ya sea desde los queries, params o el body. Posteriormente se pasan los datos a los métodos del DAO correspondiente:

## Get Controllers

En la clase controladora de las acciones GET tenemos los métodos para obtener todos los usuarios, o solo uno por su documento.

```ts
import { Request, Response } from "express";
import { UsersDAO_GET } from "../../daos/users/user-get.dao";


class UserController_GET extends UsersDAO_GET {
    public getAllUsers = (req: Request, res: Response): void => {
        const { from = 0, limit = 10, actives = false } = req.query
        UsersDAO_GET.getAllUsers(
            {
                from: Number(from),
                limit: Number(limit),
                actives: Boolean(actives)
            }, res)
    }

    public getUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        UsersDAO_GET.getUserByDocument({ document }, res)
    }
}


export const userControllerGet = new UserController_GET()
```
