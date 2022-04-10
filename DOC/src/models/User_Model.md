# User Model

Se tiene un modelo que se encarga de mapear las propiedades de una tabla de la base de datos. Esto es importante en el uso de Sequelize.

```ts
import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';

export class User extends Model {
    document!: String
    first_name!: String
    last_name!: String
    email!: String
    status!: Boolean
}

User.init(
    {
        document: {
            primaryKey: true,
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.NUMBER,
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
```
