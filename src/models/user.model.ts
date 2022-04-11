import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';

/**
 * The User class extends the Model class and has the following properties: 
 * document, first_name, last_name, email and status.
 * 
 * @author Carlos Páez
 */
export class User extends Model {
    document!: String
    first_name!: String
    last_name!: String
    email!: String
    status!: Boolean
}

/* Defining the model and the table name. */
User.init(
    {
        document: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    },
    {
        sequelize: ConnectionDB.sequelize,
        modelName: 'users',
        createdAt: false,
        updatedAt: false,
    }
)