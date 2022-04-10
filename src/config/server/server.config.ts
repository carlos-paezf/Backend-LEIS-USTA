import 'dotenv/config'
import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { green } from 'colors'
import userRoutes from '../../routes/user.routes';


/**
 * It creates an instance of the express app and sets the port
 * 
 * @author Carlos Páez
 */
export class Server {
    private _app: Application
    private _port: number
    private _host = {
        local: process.env.LOCAL_HOST,
        dev: process.env.DEV_HOST,
        prod: process.env.PROD_HOST
    }
    private _paths = {
        users: '/api/private/users'
    }


    /**
     * It creates an instance of the express app and sets the port.
     */
    constructor() {
        this._app = express()
        this._port = parseInt(process.env.PORT!, 10) || 8000
        this.config()
        this.middlewares()
        this.routes()
    }


    /**
     * It sets the port of the express app
     */
    public config(): void {
        this._app.set('PORT', this._port)
    }


    /**
     * It sets up the middlewares for the express app.
     */
    public middlewares(): void {
        this._app.use(cors())
        this._app.use(morgan('dev'))
        this._app.use(json({ limit: '100mb' }))
        this._app.use(urlencoded({ extended: true }))
    }


    /**
     * This is where we define the routes that the server will respond to.
     */
    public routes(): void {
        this._app.use(this._paths.users, userRoutes)
    }


    /**
     * It starts the server.
     */
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