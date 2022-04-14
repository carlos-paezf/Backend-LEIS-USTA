# Role Module Permission Model

En esta tabla almacenamos la relación que tienen los roles respecto a los permisos según el módulo. Por ejemplo, el rol de director de laboratorios tiene todos permisos sobre todos los módulos, pero los laboratoristas no tienen el permiso de crear usuarios, por lo tanto dicha relación no está en esta tabla.

```ts
import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';
import { Module } from './module.model';
import { Permission } from './permission.model';
import { Role } from './role.model';


export class RoleModulePermission extends Model{
    role_id!: Number
    module_id!: Number
    permission_id!: Number
}


RoleModulePermission.init(
    {
        role_id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
        },
        module_id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false
        },
        permission_id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        sequelize: ConnectionDB.sequelize,
        modelName: 'role_module_permission',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
)


RoleModulePermission.belongsTo(Role, {
    foreignKey: 'role_id',
    onDelete: 'RESTRICT',
})

RoleModulePermission.belongsTo(Module, {
    foreignKey: 'module_id',
    onDelete: 'RESTRICT',
})

RoleModulePermission.belongsTo(Permission, {
    foreignKey: 'permission_id',
    onDelete: 'RESTRICT',
})
```
