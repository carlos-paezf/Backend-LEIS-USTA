# User Model

Se tiene un modelo que se encarga de mapear las propiedades de una tabla de la base de datos. Esto es importante en el uso de Sequelize. También se tienen definidas las relaciones con otras tablas mediante el método `belongsTo()`, con lo que diríamos *Un usuario tiene un rol, y por lo tanto tiene una llave foránea que pertenece a la tabla Roles*.

```ts
import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config';
import { Role } from './role.model';


export class User extends Model {
    document!: String
    role_id!: Number
    type_document!: String
    first_name!: String
    last_name!: String
    username!: String
    email!: String
    contact_number!: String
    password!: String
    status!: Number
    enabled!: Boolean
    created_at!: Date
    updated_at!: Date
}


User.init(
    {
        document: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role_id: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        type_document: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
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
        contact_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'users',
        createdAt: false,
        updatedAt: false,
    }
)



User.belongsTo(Role, {
    foreignKey: 'role_id',
    onDelete: 'RESTRICT',
})
```
