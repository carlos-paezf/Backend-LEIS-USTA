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
        this.userRoutes.get('', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.read),
        ], userControllerGet.getAllUsers)
        this.userRoutes.get('/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.read),
        ], userControllerGet.getUserByDocument)
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
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.create),
            check([
                'document', 'type_document',
                'first_name', 'last_name', 'username',
                'email', 'contact_number', 'password'
            ], 'No se pueden enviar campos vacíos').not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').isEmail(),
            check('document').custom(documentAlreadyUsed),
            check('username').custom(usernameAlreadyUsed),
            check('email').custom(emailAlreadyUsed),
            validateFieldsErrors
        ], userControllerPost.createUser)
    }
}
```

## Put Endpoints

Para la configuración del endpoint del método PUT aplicamos diferentes handlers con el fin de decirle al usuario los posibles errores que tiene en el objeto que está enviando en el body. Algunos de los middlewares son personalizados, otros son directos de la librería `express-validator`.

```ts
class UserRoutes {
    public userRoutes: Router

    constructor() {
        this.userRoutes = Router()
        this.config()
    }

    public config = () => {
        ...
        this.userRoutes.put('/update/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.update),
            check([
                'role_id', "status_id", 'type_document',
                'first_name', 'last_name', 'username',
                'email', 'contact_number', 'password',
            ], 'No se pueden enviar campos vacíos').optional().not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').optional().isEmail(),
            check('username').optional().custom(usernameAlreadyUsed),
            check('email').optional().custom(emailAlreadyUsed),
            check('role_id').optional().custom(roleExists),
            validateFieldsErrors
        ], userControllerPut.updateUserByDocument)

        this.userRoutes.put('/enable/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.update),
        ], userControllerPut.enableUserByDocument)
    }
}
```

## Delete Endpoints

Tenemos 2 endpoints con el método DELETE: el primero sirve para deshabilitar un usuario, el segundo para removerlo por completo de la base de datos.

```ts
class UserRoutes {
    public userRoutes: Router

    constructor() {
        this.userRoutes = Router()
        this.config()
    }

    public config = () => {
        ...
        this.userRoutes.delete('/disable/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.update),
        ], userControllerDelete.disableUserByDocument)
        this.userRoutes.delete('/remove/:document', [
            validateJWT,
            validateRolFromDB(MODULES.users, PERMISSIONS.delete),
        ], userControllerDelete.permanentlyDeleteUserByDocument)
    }
}
```
