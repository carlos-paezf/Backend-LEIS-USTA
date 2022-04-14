# Module Model

En este modelo vamos a mapear los datos de la tabla `modules`, que tiene como objetivo almacenar los módulos de nuestra aplicación, los cuales más adelante tendrán diferentes permisos según los roles.

```ts
import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../config/database/connection-db.config';


export class Module extends Model {
    module_id!: Number
    name!: String
    description?: String
    created_at!: Date
    updated_at!: Date
}


Module.init(
    {
        module_id: {
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
        modelName: 'modules',
        createdAt: false,
        updatedAt: false
    }
)
```
