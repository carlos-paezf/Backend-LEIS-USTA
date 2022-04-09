# Centro de la aplicación

Dentro del archivo `index.ts` que se encuentra en el directorio de `src`, tenemos el llamado a las instancias del Server y de la conexión de la base de datos. Como los métodos para conectar a la base de datos y de iniciar el server fueron definidos como asíncronos, debemos crear un método de tipo async para poder esperar la terminación de la ejecución de los mismos.

```ts
import { ConnectionDB, Server } from "./config"


const server = new Server()
const connectionDB = new ConnectionDB()


const app = async () => {
    await connectionDB.connectPool()
    await server.start()
}


console.clear()
app()
```
