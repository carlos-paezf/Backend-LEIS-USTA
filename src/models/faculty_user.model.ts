import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';
import { FacultadDependencia } from './faculty_dependency.model';

/**
 * The `Faculty User` class extends the Model class and has the following properties: 
 * `id_documento_usuario`, `id_facultad_dependencia`
 * 
 * @author SergioG
 */
 export class FacultadUsuarios extends Model{
    id_facultad_usuario!: number
    documento_usuario!: number
    id_facultad!: number
    status!: boolean
    created_at!: Date
    updated_at!: Date
}

/* Defining the model and the table name. */
FacultadUsuarios.init(
    {
        id_facultad_usuario: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        documento_usuario: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false
        },
        id_facultad: {
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
        modelName: 'facultad_usuario',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
)


FacultadUsuarios.belongsTo(FacultadDependencia, {
    foreignKey: 'id_facultad_dependencia',
    onDelete: 'RESTRICT',
})