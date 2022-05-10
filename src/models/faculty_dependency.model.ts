import { DataTypes, Model } from "sequelize";
import { ConnectionDB } from "../config";


/**
 * The `FacultadDependencia` class extends the Model class and has the following properties:
 * `id_facultad_dependencia`, `nombre_facultad_dependencia`, `created_at`, `updated_at`
 * 
 * @author Carlos Páez
 */
export class FacultadDependencia extends Model {
    id_facultad_dependencia!: number
    nombre_facultad_dependencia!: string
    created_at!: Date
    updated_at!: Date
}


/* Defining the model and the table name */
FacultadDependencia.init(
    {
        id_facultad_dependencia: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_facultad_dependencia: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        modelName: 'facultad_dependencia',
        createdAt: false,
        updatedAt: false
    }
)
