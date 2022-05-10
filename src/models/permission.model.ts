import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';


/**
 * The `Permisos` class extends the Model class and has the following properties: 
 * `id_permiso`, `permiso_nombre`, `permiso_descripcion`, `created_at`, `updated_at`
 * 
 * @author Carlos Páez
 */
export class Permisos extends Model {
    id_permiso!: number
    permiso_nombre!: string
    permiso_descripcion!: string
    created_at!: Date
    updated_at!: Date
}


/* Defining the model and the table name. */
Permisos.init(
    {
        id_permiso: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        permiso_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        permiso_descripcion:  {
            type: DataTypes.TEXT,
            allowNull: true
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
        modelName: 'permisos',
        createdAt: false,
        updatedAt: false
    }
)