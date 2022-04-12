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

## POST DAO

En la clase DAO para el método POST, tenemos la función para crear un usuario luego de tomar los parámetros entregados por el controlador, y una vez creado el usuario, lo retornamos al usuario mediante el response.

```ts
import { red } from "colors";
import { Response } from "express";
import { User } from "../../models";


export class UserDAO_POST {
    protected static createUser = async (params: any, res: Response) => {
        try {
            const user = await User.create({ ...params, status: 1 })
            return res.status(201).json({ ok: true, user })
        } catch (error) {
            console.log(red('Error in UserDAO_POST: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}
```

## PUT DAO

Los métodos para actualizar la información del usuario consisten en recibir el documento o la data de la persona a actualizar, luego se confirma que el usuario existe en la base de datos y que cumpla con cierta condición en su estado. Si pasa las validaciones, se actualiza la información.

```ts
import { red } from "colors";
import { Response } from "express";
import { User } from "../../models";


export class UserDAO_PUT {
    protected static updateUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document, ...rest } = params
            const user = await User.findByPk(document)

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (!user.status) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} se encuentra inhabilitado`
            })

            await user.update({ ...rest })
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido actualizado correctamente`,
                user
            })
        } catch (error) {
            console.log(red('Error in UserDAO_PUT: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
        }
    }


    protected static enableUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params
            const user = await User.findByPk(document)

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (user.status) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} ya se encuentra habilitado`
            })

            await user.update({ status: 1 })
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido habilitado correctamente`,
                user
            })
        } catch (error) {
            console.log(red('Error in UserDAO_PUT: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}
```

## DELETE DAO

Se necesita el documento del usuario para poder inhabilitarlo, puesto que se requiere verificar su existencia en la base de datos junto a su estado. Si todo va bien, se actualiza el usuario.

```ts
import { Response } from "express"
import { User } from "../../models"
import { red } from 'colors';


export class UserDAO_DELETE {
    protected static disableUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params
            const user = await User.findByPk(document)

            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })
            if (!user.status) return res.status(400).json({
                ok: false,
                msg: `El usuario con el documento ${document} se encuentra inhabilitado`
            })

            await user.update({ status: 0 })
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido inhabilitado correctamente`,
                user
            })
        } catch (error) {
            console.log(red('Error in UserDAO_DELETE: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }

    protected static totalDeleteUserByDocument = async (params: any, res: Response): Promise<any> => {
        try {
            const { document } = params

            const user = await User.findByPk(document)
            if (!user) return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el documento ${document}`
            })

            await user.destroy()
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el documento ${document}, ha sido eliminado correctamente de la base de datos`
            })
        } catch (error) {
            console.log(red('Error in UserDAO_DELETE: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}
```
