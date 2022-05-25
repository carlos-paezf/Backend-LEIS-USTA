import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';

export class SoftwareFuncionamiento extends Model {
    id_software!: number
    nombre_software!: string
    n_licencia!: string
    version!: string
    fecha_vencimiento!: Date
    descripcion_software!: Text
    status!: boolean
    created_at!: Date
    updated_at!: Date
}

/* Defining the model and the table name. */
SoftwareFuncionamiento.init(
    {
        id_software: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_software: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        n_licencia:  {
            type: DataTypes.STRING,
            allowNull: true
        },
        version: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_vencimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        descripcion_software: {
            type: DataTypes.TEXT,
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
        modelName: 'software_funcionamiento',
        createdAt: false,
        updatedAt: false
    }
)