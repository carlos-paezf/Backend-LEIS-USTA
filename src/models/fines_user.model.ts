import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';
import { Multas } from './fines.model';

/**
 * 
 * @author SergioG
 */
 export class MultasUsuarios extends Model{
    id_multas_usuario!: number
    documento_usuario!: number
    id_multa!: number
    status!: boolean
    created_at!: Date
    updated_at!: Date
}

/* Defining the model and the table name. */
MultasUsuarios.init(
    {
        id_multas_usuario: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        documento_usuario: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false
        },
        id_multa: {
            type: DataTypes.DOUBLE,
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
        modelName: 'multas_usuario',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
)


MultasUsuarios.belongsTo(Multas, {
    foreignKey: 'id_multa',
    onDelete: 'RESTRICT',
})