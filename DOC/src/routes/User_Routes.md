# User Routes

Tenemos una clase que se encarga  de asignarle las referencias de los métodos del controlador a los diferentes endpoints según el modelo. Las rutas son almacenadas dentro de una variable que contiene la configuración de las mismas, y se exporta dentro una instancia de la clase.

## GET Endpoints

```ts
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
```

## POST Endpoints

Para la configuración del endpoint del método POST aplicamos diferentes handlers con el fin de decirle al usuario los posibles errores que tiene en el objeto que está enviando en el body. Algunos de los middlewares son personalizados, otros son directos de la librería `express-validator`.

```ts
class UserRoutes {
    public userRoutes: Router

    constructor() {
        this.userRoutes = Router()
        this.config()
    }

    public config = () => {
        ...
        this.userRoutes.post('/create', [
            check('document', 'El documento es obligatorio').not().isEmpty(),
            check('first_name', 'El nombre es obligatorio').not().isEmpty(),
            check('last_name', 'El apellido es obligatorio').not().isEmpty(),
            check('email', 'El correo es obligatorio').not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').isEmail(),
            check('document').custom(documentAlreadyUsed),
            check('email').custom(emailAlreadyUsed),
            validateFieldsErrors
        ], userControllerPost.createUser)
    }
}
```
