import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';

export class Multas extends Model {
    id_multa!: number
    nombre_multa!: string
    precio_multa!: string
    creacion_multa!: Date
    vencimiento_multa!: Date
    descripcion_multa!: string
    status!: boolean
    created_at!: Date
    updated_at!: Date
}

/* Defining the model and the table name. */
Multas.init(
    {
        id_multa: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_multa: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        precio_multa:  {
            type: DataTypes.TEXT,
            allowNull: false
        },
        creacion_multa: {
            type: DataTypes.DATE,
            allowNull: false
        },
        vencimiento_multa: {
            type: DataTypes.DATE,
            allowNull: false
        },
        descripcion_multa: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: 'multas',
        createdAt: false,
        updatedAt: false
    }
)