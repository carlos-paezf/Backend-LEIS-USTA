# Auth Controller

Para la autenticación incluimos el ingreso con correo y contraseña, el registro con los mismo, o el ingreso y registro con GMail. La primera configuración es el ingreso con correo y contraseña.

## POST Controller

```ts
import { Request, Response } from "express";
import { AuthDAO_POST } from "../../daos/auth/auth_post.dao";

class AuthController_POST extends AuthDAO_POST {
    public loginWithEmailAndPassword = (req: Request, res: Response) => {
        AuthDAO_POST.loginWithEmailAndPassword({...req.body}, res)
    }
}

export const authControllerPost = new AuthController_POST()
```
