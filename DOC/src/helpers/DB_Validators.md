# DB Validators

En este archivo tenemos diferentes métodos con el fin de acceder a la base de datos mediante los modelos y consultar algo en especifico, por ejemplo si un documento o un email ya está siendo por algún otro usuario en la tabla de Usuarios. Los métodos registrados en este archivo pueden ser considerados como handlers.

```ts
import { Role, Status, User } from "../models"


export const documentAlreadyUsed = async (document: string): Promise<void> => {
    const documentExists = await User.findOne({
        attributes: ['document'],
        where: { document }
    })
    if (documentExists) throw new Error(`Ya existe un usuario con el documento ${document}`)
}


export const emailAlreadyUsed = async (email: string): Promise<void> => {
    const emailExists = await User.findOne({
        attributes: ['email'],
        where: { email }
    })
    if (emailExists) throw new Error(`Ya existe un usuario con el correo ${email}`)
}


export const usernameAlreadyUsed = async (username: string): Promise<void> => {
    const usernameExists = await User.findOne({
        attributes: ['username'],
        where: { username }
    })
    if (usernameExists) throw new Error(`Ya existe un usuario con el nombre de usuario ${username}`)
}


export const roleExists = async (roleId: any): Promise<any> => {
    const roleExists = await Role.findByPk(roleId, {
        attributes: ['role_id']
    })
    if (!roleExists) throw new Error(`No existe un rol con el id ${roleId}`)
}


export const statusExists = async (statusId: any): Promise<any> => {
    const statusExists = await Status.findByPk(statusId, {
        attributes: ['status_id']
    })
    if (!statusExists) throw new Error(`No existe un estatus con el id ${statusId}`)
}
```
