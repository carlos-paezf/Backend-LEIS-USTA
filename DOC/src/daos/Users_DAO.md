# Users DAO (Data Access Object)

Dentro del directorio `daos` tenemos diferentes clases que se encargan de solicitar los datos a la base de datos mediante los métodos del ORM (Object Relational Mapping).

## GET DAO

La primera clase de los DAO contiene los métodos para obtener todos los usuarios, pero se tiene en cuenta la cantidad de registros que el usuario quiere, y si solo quiere a los usuarios activos. También se tiene otro método que se encarga de traer un usuario por su documento, pero en caso de que el usuario no esté habilitado, se muestra un mensaje de alerta.

```ts
import { red } from "colors"
import { Response } from "express"
import { User } from "../../models"


export class UsersDAO_GET {
    protected static getAllUsers = async (params: any, res: Response): Promise<any> => {
        try {
            const { from, limit, actives } = params
            const { count, rows } = await User.findAndCountAll({
                offset: from, limit,
                where: actives && { 'status': 1 }
            })
            return res.status(200).json({
                ok: true,
                from, limit, count, actives,
                data: rows
            })
        } catch (error) {
            console.log(red('Error in UserDAO_GET: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
        }
    }

    protected static getUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params
            const user = await User.findByPk(document)
            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (!user.status) return res.status(400).json({ 
                ok: false, 
                msg: `El usuario con el documento ${document} está inhabilitado`,
            })
            return res.json({ ok: true, user })
        } catch (error) {
            return res.status(500).json({ 
                ok: false, 
                msg: 'Comuníquese con el Administrador'
            })
        }
    }
}
```
