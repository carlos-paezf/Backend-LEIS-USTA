import 'dotenv/config'


/**
 * Exporting the database variables from the .env file. 
 * 
 * @author Carlos Páez
 */
export const DB_VARS = {
    host:       process.env.DB_HOST!,
    port:       parseInt(process.env.DB_PORT!, 10),
    database:   process.env.DB_NAME!,
    user:       process.env.DB_USER!,
    password:   process.env.DB_PASSWORD!
}