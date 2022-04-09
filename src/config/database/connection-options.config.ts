import pgPromise from "pg-promise";
import ConnectionFunctions from './connection-functions.config';
import { IClient } from "pg-promise/typescript/pg-subset";


/**
 * This class is used to configure the pg-promise library. 
 * 
 * @author Carlos Páez
 */
class ConnectionOptions {
    /**
     * This is the configuration for the pg-promise library
     */
    static pgOptions: pgPromise.IInitOptions<IClient> = {
        receive(data, result, error) {
            ConnectionFunctions.camelizeColumns(data)
        }
    }
}


export default ConnectionOptions