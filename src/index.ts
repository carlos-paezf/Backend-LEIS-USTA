import { ConnectionDB, Server } from "./config"


const server = new Server()
const connectionDB = new ConnectionDB()


/**
 * The app function is an async function that awaits the connectionDB.connectPool function and then
 * awaits the server.start function.
 * 
 * @author Carlos Páez
 */
const app = async () => {
    await connectionDB.connectPool()
    await server.start()
}


console.clear()
app()