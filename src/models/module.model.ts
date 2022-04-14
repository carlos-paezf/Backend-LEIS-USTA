import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';


/**
 * The Module class extends the Model class and has the following properties: 
 * `module_id`, `name`, `description`, `created_at`, `updated_at`
 * 
 * @author Carlos Páez
 */
export class Module extends Model {
    module_id!: Number
    name!: String
    description?: String
    created_at!: Date
    updated_at!: Date
}


/* Defining the model and the table name. */
Module.init(
    {
        module_id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description:  {
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
        modelName: 'modules',
        createdAt: false,
        updatedAt: false
    }
)