import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config';


/**
 * The `Roles` class extends the Model class and has the following properties: 
 * `id_rol`, `rol_nombre`, `rol_descripcion`, `created_at`, `updated_at`
 * 
 * @author Carlos Páez
 */
export class Roles extends Model {
    id_rol!: number
    rol_nombre!: string
    rol_descripcion!: string
    created_at!: Date
    updated_at!: Date
}


/* Defining the model and the table name. */
Roles.init(
    {
        id_rol: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        rol_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        rol_descripcion:  {
            type: DataTypes.TEXT,
            allowNull: true
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
        modelName: 'roles',
        createdAt: false,
        updatedAt: false
    }
)