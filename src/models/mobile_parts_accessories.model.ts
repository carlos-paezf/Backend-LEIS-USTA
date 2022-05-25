import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';

export class PartesMovilesAccesorios extends Model {
    id_partes_moviles_accesorios!: number
    nombre_partes!: string
    cantidad!: number
    marca!: string
    n_inventario!: string
    status!: boolean
    created_at!: Date
    updated_at!: Date
}

/* Defining the model and the table name. */
PartesMovilesAccesorios.init(
    {
        id_partes_moviles_accesorios: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_partes: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        cantidad:  {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        marca:  {
            type: DataTypes.STRING,
            allowNull: false
        },
        n_inventario:  {
            type: DataTypes.STRING,
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
        modelName: 'partes_moviles_accesorios',
        createdAt: false,
        updatedAt: false
    }
)