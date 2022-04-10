import pgPromise from "pg-promise";
import ConnectionOptions from "./connection-options.config";
import { blue, red, cyan } from 'colors';
import { DB_VARS } from "./connection-vars.config";
import { Sequelize } from 'sequelize';


/* Destructuring the object DB_VARS. */
const { host, port, dialect, database, user, password } = DB_VARS


/**
 * It creates a pool of connections to the database 
 * 
 * @author Carlos Páez
 */
export class ConnectionDB {
    private _pgp = pgPromise(ConnectionOptions.pgOptions)
    private _pool = this._pgp(DB_VARS)

    public static sequelize_uri = `${dialect}://${user}:${password}@${host}:${port}/${database}`
    public static sequelize = new Sequelize(this.sequelize_uri, {
        logging: msg => console.log(cyan.italic(`> ${msg}`)),
    })
    

    /**
     * It connects to the database.
     */
    public async connectionPgPromise(): Promise<void> {
        try {
            const connection = await this._pool.connect()
            connection.done()
            console.log(blue.italic(`> Connection established with the database: ${database} \n`))
        } catch (error) {
            console.log(red('> Error in ConnectionDB: '), error)
        }
    }


    /**
     * It connects to the database and prints a message to the console if the connection is successful.
     */
    public async connectionSequelize(): Promise<void> {
        try {
            await ConnectionDB.sequelize.authenticate()
            console.log(blue.italic(`> Connection established with the database: ${database} \n`))
        } catch (error) {
            console.log(red('> Error in ConnectionSequelize: '), error)
        }
    }

    
    /**
     * This function closes the connection with the database.
     */
    public async disconnectSequelize(): Promise<void> {
        await ConnectionDB.sequelize.close()
        console.log(blue.italic(`> Connection closed with the database: ${database} \n`))
    }
}