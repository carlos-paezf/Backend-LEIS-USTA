import { ConnectionDB, Server } from "./config"


const server = new Server()
const connectionDB = new ConnectionDB()


/**
 * The app function is an async function that awaits the connection to the database and the server to
 * start.
 * 
 * @author Carlos Páez
 */
const app = async () => {
    // await connectionDB.connectionPgPromise()
    await connectionDB.connectionSequelize()
    await server.start()
}


console.clear()
app()