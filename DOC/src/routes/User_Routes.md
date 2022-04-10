# User Routes

Tenemos una clase que se encarga  de asignarle las referencias de los métodos del controlador a los diferentes endpoints según el modelo. Las rutas son almacenadas dentro de una variable que contiene la configuración de las mismas, y se exporta dentro una instancia de la clase.

```ts
import { Router } from "express";
import { userControllerGet } from "../controllers/users";


class UserRoutes {
    public userRoutes: Router

    constructor() {
        this.userRoutes = Router()
        this.config()
    }

    public config = () => {
        this.userRoutes.get('/', userControllerGet.getAllUsers)
        this.userRoutes.get('/:document', userControllerGet.getUserByDocument)
    }
}


const userRoutes = new UserRoutes()
export default userRoutes.userRoutes
```
