# Permission Model

La tabla `permissions` almacena los operaciones o permisos que pueden actuar sobre la aplicación, tales como Crear, Listar, Actualizar o Eliminar.

```ts
import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';


export class Permission extends Model {
    permission_id!: Number
    name!: String
    description?: String
    created_at!: Date
    updated_at!: Date
}


Permission.init(
    {
        permission_id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description:  {
            type: DataTypes.TEXT,
            allowNull: true
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
        modelName: 'permissions',
        createdAt: false,
        updatedAt: false
    }
)
```
