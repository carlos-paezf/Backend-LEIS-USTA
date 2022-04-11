# DB Validators

En este archivo tenemos diferentes métodos con el fin de acceder a la base de datos mediante los modelos y consultar algo en especifico, por ejemplo si un documento o un email ya está siendo por algún otro usuario en la tabla de Usuarios. Los métodos registrados en este archivo pueden ser considerados como handlers.

```ts
import { User } from "../models"


export const documentAlreadyUsed = async (document: string): Promise<void> => {
    const documentExists = await User.findOne({ where: { document } })
    if (documentExists) throw new Error(`Ya existe un usuario con el documento ${document}`)
}


export const emailAlreadyUsed = async (email: string): Promise<void> => {
    const emailExists = await User.findOne({ where: { email } })
    if (emailExists) throw new Error(`Ya existe un usuario con el correo ${email}`)
}
```
