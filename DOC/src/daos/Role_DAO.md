# Role DAO

## GET DAO

Dentro del controlador para el método GET tenemos las funciones de: Obtener todos los roles, Obtener todos los permisos que tiene un rol en especifico. Para acceder al módulo de los roles, se debe tener el rol de Programador (durante el desarrollo) o de Director de Laboratorios, por lo tanto en la configuración de los endpoints se valida el rol.

```ts
import { red } from 'colors';
import { Response } from 'express';
import { Permission, Role, RoleModulePermission, Module } from '../../models';


export class RolesDAO_GET {
    protected static getAllRoles = async (params: any, res: Response) => {
        try {
            const { from: offset, limit } = params
            const { count, rows } = await Role.findAndCountAll({
                offset, limit,
                attributes: [
                    'role_id', 'name', 'description'
                ]
            })

            return res.status(200).json({
                ok: true,
                from: offset, limit, count,
                data: rows
            })
        } catch (error) {
            console.log(red('Error in RolesDAO_GET: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el Administrador'
            })
        }
    }


    protected static getRolePermissionsById = async (params: any, res: Response) => {
        try {
            const { roleId: role_id } = params
            const role = await Role.findByPk(role_id, {
                attributes: ['role_id']
            })
            if (!role) return res.status(400).json({
                ok: false,
                msg: `No hay ningún rol con el id ${role_id}`
            })

            const { count, rows } = await RoleModulePermission.findAndCountAll({
                attributes: ['module_id', 'permission_id'],
                where: { role_id },
                include: [
                    {
                        model: Module,
                        attributes: ['name', 'description']
                    },
                    {
                        model: Permission,
                        attributes: ['name', 'description']
                    }
                ]
            })

            if (count === 0) return res.status(200).json({
                ok: true,
                msg: `El rol identificado con el id ${role_id}, no cuenta con ningún permiso`
            })

            return res.status(200).json({
                ok: true,
                role_id,
                count,
                data: rows
            })
        } catch (error) {
            console.log(red('Error in RoleDAO_GET: '), error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador'
            })
        }
    }
}
```
