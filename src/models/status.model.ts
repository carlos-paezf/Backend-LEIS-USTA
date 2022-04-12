import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config';


/**
 * The Status class extends the Model class and has the following properties: 
 * status_id, name, description, created_at, updated_at
 * 
 * @author Carlos Páez
 */
export class Status extends Model {
    status_id!: Number
    name!: String
    description?: String
    created_at!: Date
    updated_at!: Date
}


Status.init(
    {
        status_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        modelName: 'status',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
)