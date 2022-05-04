# Server

Tenemos una clase que configuramos nuestro servidor de nuestra aplicación. Tenemos establecidas las variables para almacenar la configuración de express, el puerto por donde se ejecuta el proyecto, las direcciones de los host donde se están ejecutando las versiones de local, desarrollo o producción, y por último un objeto con las rutas base de los endpoints de nuestros servicios.

También, tenemos un método en donde configuramos elementos de la configuración de express, otro para usar middlewares dentro de la aplicación, otra función para poder usar los endpoints de acceso a los diversos controladores, y por último un método para levantar el servidor.

```ts
import 'dotenv/config'
import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { green } from 'colors'
import userRoutes from '../../routes/user.routes';

export class Server {
    private _app: Application
    private _port: number
    private _host = {
        local: process.env.LOCAL_HOST,
        dev: process.env.DEV_HOST,
        prod: process.env.PROD_HOST
    }
    private _paths = {
        auth: '/api/auth',
        users: '/api/private/users',
        roles: '/api/private/roles'
    }

    constructor() {
        this._app = express()
        this._port = parseInt(process.env.PORT!, 10) || 8000
        this.config()
        this.middlewares()
        this.routes()
    }

    public config(): void {
        this._app.set('PORT', this._port)
    }

    public middlewares(): void {
        this._app.use(cors())
        this._app.use(morgan('dev'))
        this._app.use(json({ limit: '100mb' }))
        this._app.use(urlencoded({ extended: true }))
    }

    public routes(): void {
        this._app.use(this._paths.auth, authRoutes)
        this._app.use(this._paths.users, userRoutes)
        this._app.use(this._paths.roles, rolesRoutes)
    }

    public async start(): Promise<any> {
        this._app.listen(this._port, () => {
            console.log(green(`> Server running in:`))
            console.log(green(`     - Local mode: ${this._host.local}:${this._port}`))
            console.log(green(`     - Development mode: ${this._host.dev}:${this._port}`))
            console.log(green(`     - Production mode: ${this._host.prod}:${this._port}`))
            console.log('\n')
        })
    }
}
```
