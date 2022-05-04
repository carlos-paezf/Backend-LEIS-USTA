import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';
import { Modulos } from './module.model';
import { Permisos } from './permission.model';
import { Roles } from './role.model';


/**
 * The `RolesModulosPermisos` class extends the Model class and has the following properties: 
 * `id_rol_modulo_permiso`, `id_rol`, `id_modulo`, `id_permiso`
 * 
 * @author Carlos Páez
 */
export class RolesModulosPermisos extends Model{
    id_rol_modulo_permiso!: Number
    id_rol!: Number
    id_modulo!: Number
    id_permiso!: Number
}


/* Defining the model and the table name. */
RolesModulosPermisos.init(
    {
        id_rol_modulo_permiso: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
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