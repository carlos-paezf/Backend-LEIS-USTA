# Validate Rol

Dentro del middleware para validar el rol, recibimos el identificador del módulo al que se piensa acceder y el identificador del permiso que se piensa usar. Ambos identificadores son llaves primarias dentro de la tablas respectivas en la base de datos. También se recibe el rol del usuario, dato que se encuentra guardado en el payload del JWT y que fue entregado al body del request.

Es importante atrapar los errores del programador, por lo que se verifica que los identificadores del módulo y el permiso se encuentran dentro de la base de datos. Una vez se confirma que el rol, módulo y permiso se han verificado, entonces procedemos a hacer una consulta a la taba `role_module_permission`, en donde tenemos la relación de los roles con los permisos asignados al mismo. Si nuestra consulta no retorna ningún dato, entonces significa que el usuario que está intentando acceder al servicio, no tiene el rol necesario para lograrlo.

```ts
import { NextFunction, Request, Response } from "express"
import { Module, Role } from "../models"
import { red } from 'colors';
import { Permission } from '../models/permission.model';
import { RoleModulePermission } from '../models/role_module_permission.model';


export const validateRolFromDB = (module: number, permission: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { jwtPayload } = req.body
            if (!jwtPayload) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: JWTValidate' })

            const { role } = jwtPayload
            if (!role) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: JWTRol' })

            const moduleDB = await Module.findByPk(module, { attributes: ['module_id'] })
            if (!moduleDB) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: DBModule' })

            const permissionDB = await Permission.findByPk(permission, { attributes: ['permission_id'] })
            if (!permissionDB) return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador. Error: DBPermission' })

            const roleModulePermission = await RoleModulePermission.findOne({
                where: {
                    'role_id': role,
                    'module_id': module,
                    'permission_id': permission
                }
            })

            if (!roleModulePermission) return res.status(401).json({ ok: false, msg: 'No cuenta con los permisos adecuados para realizar la acción' })

            next()
        } catch (error) {
            console.log(red('Error in validateRolFromDB: '), error)
            return res.status(500).json({ ok: false, msg: 'Comuníquese con el Administrador' })
        }
    }
}
```
