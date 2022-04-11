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

## Post Controller

En la clase controladora de las acciones POST tenemos el método para añadir un usuario a la base de datos. Es importante tener en cuenta que antes de entrar en el controlador, la petición al servidor entra en el archivo de las rutas, en donde se aplican middlewares y/o handlers para poder tomar el request y analizarlo. Luego entramos al controlador y allí es donde tomamos los valores del body o params y lo entregamos al DAO.

```ts
import { Request, Response } from "express";
import { UserDAO_POST } from "../../daos/users";

class UserController_POST extends UserDAO_POST {
    public createUser = (req: Request, res: Response): void => {
        UserDAO_POST.createUser({ ...req.body }, res)
    }
}

export const userControllerPost = new UserController_POST()
```

## Put Controller

En esta clase tenemos los métodos para actualizar la información de un usuario o para inhabilitar su estado. En ambos método es importante el documento del usuario.

```ts
import { Request, Response } from "express";
import { UserDAO_PUT } from "../../daos/users";


class UserController_PUT extends UserDAO_PUT {
    public updateUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        const { first_name, last_name, email } = req.body
        UserDAO_PUT.updateUserByDocument({ document, first_name, last_name, email }, res)
    }
    
    public enableUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        UserDAO_PUT.enableUserByDocument({ document }, res)
    }
}


export const userControllerPut = new UserController_PUT()
```

## Delete Controller

En este controlador tenemos los método para inhabilitar o eliminar un usuario.

```ts
import { Request, Response } from "express";
import { UserDAO_DELETE } from "../../daos/users";


class UserController_DELETE extends UserDAO_DELETE {
    public disableUserByDocument = (req: Request, res: Response): void => {
        const { document } = req.params
        UserDAO_DELETE.disableUserByDocument({ document }, res)
    }
}


export const userControllerDelete = new UserController_DELETE()
```
