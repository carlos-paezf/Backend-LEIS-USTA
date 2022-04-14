# Auth DAO

## POST DAO

En el método para iniciar sesión con email y contraseña, tenemos que capturar dichos datos desde el controlador y enviarlos como un objeto. Una vez tenemos los datos, buscamos a un usuario mediante el correo ya que es una columna con valores únicos. Si el usuario no está registrado, ingreso mal sus datos o está inhabilitado, no puede hacer uso de la api.

Cuando todo va bien, se genera un Json Web Token (JWT) teniendo como payload algunos datos no tan sensible del usuario. Por último se retorna una respuesta 200 con el token generado.

```ts
import { compareSync } from "bcryptjs";
import { Response } from "express";
import { User } from "../../models";
import { red } from 'colors';
import { generateJWT } from "../../helpers";


export class AuthDAO_POST {
    protected static loginWithEmailAndPassword = async (params: any, res: Response): Promise<any> => {
        try {
            const { email, password } = params
            const user = await User.findOne({
                where: { email },
            })
            if (!user) return res.status(401).json({ ok: false, msg: 'Correo o contraseña incorrectos - c' })
            if (user.enabled === false) return res.status(401).json({ ok: false, msg: 'Usuario inhabilitado' })

            const validPassword = compareSync(password, user.password.toString())
            if (!validPassword) return res.status(401).json({ ok: false, msg: 'Correo o contraseña incorrectos - p' })

            const token = await generateJWT({
                document: user.document,
                username: user.username,
                role: user.role_id
            })

            return res.status(200).json({
                ok: true,
                token,
            })
        } catch (error) {
            console.log(red('Error in AuthDAO_POST: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
        }
    }
}
```
