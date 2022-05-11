import { Model, DataTypes } from "sequelize"
import { ConnectionDB } from "../config"

export class Estados extends Model {
    id_estado!: number
    nombre_estado!: string
    descripcion!: string
}

Estados.init({
    id_estado: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true
    },
    nombre_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: ConnectionDB.sequelize,
    modelName: 'estados',
    createdAt: false,
    updatedAt: false
})