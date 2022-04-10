# Connection DB

Dentro del directorio `database` tenemos diversos archivos que nos ayudan con la configuración de la conexión a la base de datos.

## `connection-vars.config.ts`

En este archivo se encuentran almacenados los elementos necesarios para conexión mediante `pg-promise`. Los valores de dichas variables, se toman de las variables de entorno:

```ts
import 'dotenv/config'

export const DB_VARS = {
    host:       process.env.DB_HOST!,
    port:       parseInt(process.env.DB_PORT!, 10),
    dialect:    'postgres',
    database:   process.env.DB_NAME!,
    user:       process.env.DB_USER!,
    password:   process.env.DB_PASSWORD!
}
```

## `connection-functions.config.ts`

Dentro de este archivo tenemos una clase con una función estática que se encarga de camelizar los nombres de las columnas de las tablas en la base datos. Es decir, si en nuestra base de datos tenemos una columna con el nombre `user_id`, la respuesta que obtenemos mediante pg-promise será `userId`.

```ts
import pgPromise from 'pg-promise'

export interface IClient { }

class ConnectionFunctions {
    static camelizeColumns = (data: any) => {
        const tmp = data[0]

        for (const prop in tmp) {
            const camel = pgPromise.utils.camelize(prop)

            if (!(camel in tmp)) {
                for (let i = 0; i < data.length; i++) {
                    const d = data[i]
                    d[camel] = d[prop]
                    delete d[prop]
                }
            }
        }
    }
}

export default ConnectionFunctions
```

## `connection-options.config.ts`

En la clase que contiene este archivo, nos encargamos de tener un objeto estático en donde recibimos la data y la camelizamos con la función creada en la sección anterior.

```ts
import pgPromise from "pg-promise";
import ConnectionFunctions from './connection-functions.config';
import { IClient } from "pg-promise/typescript/pg-subset";

class ConnectionOptions {
    static pgOptions: pgPromise.IInitOptions<IClient> = {
        receive(data, result, error) {
            ConnectionFunctions.camelizeColumns(data)
        }
    }
}

export default ConnectionOptions
```

## `connection-db.config.ts`

En este archivo nos encargamos de crear un pool de conexión con la base de datos, a partir de las variables definidas en el archivo `connection-vars.config.ts`. Luego tenemos una función con la que intentamos conectarnos a la base de datos. Dicha función es asíncrona, pues se espera que nuestro server solo funcione si no hay problemas con la base de datos. Respecto a dicha función, tenemos 2 versiones, una para conectar con Pg-Promise y hacer uso de sentencias personalizadas, y otra versión para user el ORM de Sequelize.

```ts
import pgPromise from "pg-promise";
import ConnectionOptions from "./connection-options.config";
import { blue, red, cyan } from 'colors';
import { DB_VARS } from "./connection-vars.config";
import { Sequelize } from 'sequelize';


const { host, port, dialect, database, user, password } = DB_VARS


export class ConnectionDB {
    private _pgp = pgPromise(ConnectionOptions.pgOptions)
    private _pool = this._pgp(DB_VARS)

    private _sequelize_uri = `${dialect}://${user}:${password}@${host}:${port}/${database}`
    private _sequelize = new Sequelize(this._sequelize_uri, {
        logging: msg => console.log(cyan(msg)),
    })

    public async connectionPgPromise(): Promise<void> {
        try {
            const connection = await this._pool.connect()
            connection.done()
            console.log(blue.italic(`> Connection established with the database: ${database} \n`))
        } catch (error) {
            console.log(red('Error in ConnectionDB: '), error)
        }
    }

    public async connectionSequelize(): Promise<void> {
        try {
            await this._sequelize.authenticate()
            console.log(blue.italic(`> Connection established with the database: ${database} \n`))
        } catch (error) {
            console.log(red('Error in ConnectionSequelize: '), error)
        }
    }

    public async disconnectSequelize(): Promise<void> {
        await this._sequelize.close()
        console.log(blue.italic(`> Connection closed with the database: ${database} \n`))
    }
}
```
