import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';
import { Modulos } from './module.model';
import { Permisos } from './permission.model';
import { Roles } from './role.model';


/**
 * The `RolesModulosPermisos` class extends the Model class and has the following properties: 
 * `id_rol`, `id_modulo`, `id_permiso`
 * 
 * @author Carlos Páez
 */
export class RolesModulosPermisos extends Model{
    id_rol!: number
    id_modulo!: number
    id_permiso!: number
}


/* Defining the model and the table name. */
RolesModulosPermisos.init(
    {
        id_rol: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
        },
        id_modulo: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false
        },
        id_permiso: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize: ConnectionDB.sequelize,
        modelName: 'roles_modulos_permisos',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
)


RolesModulosPermisos.belongsTo(Roles, {
    foreignKey: 'id_rol',
    onDelete: 'RESTRICT',
})

RolesModulosPermisos.belongsTo(Modulos, {
    foreignKey: 'id_modulo',
    onDelete: 'RESTRICT',
})

RolesModulosPermisos.belongsTo(Permisos, {
    foreignKey: 'id_permiso',
    onDelete: 'RESTRICT',
})