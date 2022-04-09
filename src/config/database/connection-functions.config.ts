import pgPromise from 'pg-promise'


export interface IClient { }


/**
 * The class contains a static method that will convert the column names in the data to camelCase. 
 * 
 * @author Carlos Páez
 */
class ConnectionFunctions {
    /**
     * Camelize the column names in the data. 
     * This is a function that will convert the column names to camelCase
     * @param {any} data - The data to be transformed 
     */
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