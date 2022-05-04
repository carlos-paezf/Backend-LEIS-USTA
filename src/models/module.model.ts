import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';


/**
 * The `Modulos` class extends the Model class and has the following properties: 
 * `id_modulo`, `modulo_nombre`, `modulo_descripcion`, `created_at`, `updated_at`
 * 
 * @author Carlos Páez
 */
export class Modulos extends Model {
    id_modulo!: Number
    modulo_nombre!: String
    modulo_descripcion!: String
    created_at!: Date
    updated_at!: Date
}


/* Defining the model and the table name. */
Modulos.init(
    {
        id_modulo: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        modulo_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        modulo_descripcion:  {
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
        modelName: 'modulos',
        createdAt: false,
        updatedAt: false
    }
)