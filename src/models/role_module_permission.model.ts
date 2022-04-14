import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';
import { Module } from './module.model';
import { Permission } from './permission.model';
import { Role } from './role.model';


/**
 * The RoleModulePermission class extends the Model class and has the following properties: 
 * `role_id`, `module_id`, `permission_id`
 * 
 * @author Carlos Páez
 */
export class RoleModulePermission extends Model{
    role_id!: Number
    module_id!: Number
    permission_id!: Number
}


/* Defining the model and the table name. */
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