import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';


/**
 * The Operation class extends the Model class and has the following properties: 
 * `permission_id`, `name`, `description`, `created_at`, `updated_at`
 * 
 * @author Carlos Páez
 */
export class Permission extends Model {
    permission_id!: Number
    name!: String
    description?: String
    created_at!: Date
    updated_at!: Date
}


/* Defining the model and the table name. */
Permission.init(
    {
        permission_id: {
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
        modelName: 'permissions',
        createdAt: false,
        updatedAt: false
    }
)