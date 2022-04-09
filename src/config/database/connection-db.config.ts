import pgPromise from "pg-promise";
import ConnectionOptions from "./connection-options.config";
import { blue, red } from "colors";
import { DB_VARS } from "./connection-vars.config";


/**
 * It creates a pool of connections to the database 
 * 
 * @author Carlos Páez
 */
export class ConnectionDB {
    private _pgp = pgPromise(ConnectionOptions.pgOptions)
    public pool: any


    /**
     * It creates a pool of connections to the database.
     */
    constructor() {
        this.pool = this._pgp(DB_VARS)
    }


    /**
     * It connects to the database.
     */
    public async connectPool(): Promise<any> {
        try {
            const connection = await this.pool.connect()
            connection.done()
            console.log(blue.italic(`> Connection established with the database: ${DB_VARS.database} \n`))
        } catch (error) {
            console.log(red('Error in ConnectionDB: '), error)
        }
    }
}