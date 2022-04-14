import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config';
import { Role } from './role.model';


/**
 * The User class extends the Model class and has the following properties: 
 * `document`, `role_id`, `status_id`, `type_document`, `first_name`, `last_name`, 
 * `username`, `email`, `contact_number`, `password`, `enabled`, 
 * `created_at`,`updated_at`
 * 
 * @author Carlos Páez
 */
export class User extends Model {
    document!: String
    role_id!: Number
    type_document!: String
    first_name!: String
    last_name!: String
    username!: String
    email!: String
    contact_number!: String
    password!: String
    status!: Number
    enabled!: Boolean
    created_at!: Date
    updated_at!: Date
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
        role_id: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        type_document: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contact_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        enabled: {
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
        modelName: 'users',
        createdAt: false,
        updatedAt: false,
    }
)



User.belongsTo(Role, {
    foreignKey: 'role_id',
    onDelete: 'RESTRICT',
})