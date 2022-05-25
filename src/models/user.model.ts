import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config';
import { FacultadUsuarios } from './faculty_user.model';
import { MultasUsuarios } from './fines_user.model';
import { Roles } from './role.model';
import { Estados } from './status.model';


/**
 * The `Usuarios` class extends the Model class and has the following properties: 
 * `documento`, `id_rol`, `tipo_documento`, `nombres`, `apellidos`, 
 * `username`, `email`, `numero_contacto`, `password`, `status`, `enabled`, 
 * `created_at`,`updated_at`
 * 
 * @author Carlos Páez
 */
export class Usuarios extends Model {
    documento!: string
    id_rol!: number
    tipo_documento!: string
    nombres!: string
    apellidos!: string
    username!: string
    email!: string
    numero_contacto!: string
    password!: string
    id_estado!: number
    enabled!: boolean
    created_at!: Date
    updated_at!: Date
}

/* Defining the model and the table name. */
Usuarios.init(
    {
        documento: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id_rol: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        tipo_documento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
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
        numero_contacto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_estado: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        modelName: 'usuarios',
        createdAt: false,
        updatedAt: false,
    }
)


Usuarios.belongsTo(Roles, {
    foreignKey: 'id_rol',
    onDelete: 'RESTRICT',
})

Usuarios.belongsTo(Estados, {
    foreignKey: 'id_estado',
    onDelete: 'RESTRICT'
})
Usuarios.belongsTo(FacultadUsuarios, {
    foreignKey: 'documento_usuario',
    onDelete: 'RESTRICT'
})
Usuarios.belongsTo(MultasUsuarios, {
    foreignKey: 'documento_usuario',
    onDelete: 'RESTRICT'
})