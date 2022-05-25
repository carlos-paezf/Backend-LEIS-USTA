import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';
import { PartesMovilesAccesorios } from './mobile_parts_accessories.model';
import { SoftwareFuncionamiento } from './software_operation.model';
import { DocumentacionTecnica } from './technical_documentation.model';

export class CaracteristicasTecnicas extends Model{
    id_caracteristicas_tecnicas!: number
    frecuencia_hz!: string
    voltaje_v!: string
    corriente_ac!: string
    corriente_dc!: string
    potencia_vatios!: string
    capacidad!: string
    presion_psi!: string
    temperatura_c!: string
    peso_kg!: string
    velocidad_rpm!: string
    tecnologia_predominante!: number
    fuente_alimentacion!: number
    id_tipo_manual!: number
    id_software_funcionamiento!: number
    id_partes_moviles_accesorios!: number
    status!: boolean
    created_at!: Date
    updated_at!: Date
}

CaracteristicasTecnicas.init(
    {
        id_caracteristicas_tecnicas: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        frecuencia_hz: {
            type: DataTypes.STRING,
            allowNull: false
        },
        voltaje_v: {
            type: DataTypes.STRING,
            allowNull: false
        },
        corriente_ac: {
            type: DataTypes.STRING,
            allowNull: false
        },
        corriente_dc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        potencia_vatios: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        presion_psi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        temperatura_c: {
            type: DataTypes.STRING,
            allowNull: false
        },
        peso_kg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        velocidad_rpm: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tecnologia_predominante: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        fuente_alimentacion: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        id_tipo_manual: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        id_software_funcionamiento: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        id_partes_moviles_accesorios: {
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
        modelName: 'caracteristicas_tecnicas',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
)

CaracteristicasTecnicas.belongsTo(DocumentacionTecnica, {
    foreignKey: 'id_tipo_manual',
    onDelete: 'RESTRICT',
})

CaracteristicasTecnicas.belongsTo(SoftwareFuncionamiento, {
    foreignKey: 'id_software_funcionamiento',
    onDelete: 'RESTRICT',
})

CaracteristicasTecnicas.belongsTo(PartesMovilesAccesorios, {
    foreignKey: 'id_partes_moviles_accesorios',
    onDelete: 'RESTRICT',
})