# Roles Routes

## GET Endpoints

```ts
class RolesRoutes {
    public rolesRouter: Router

    constructor() {
        this.rolesRouter = Router()
        this.config()
    }

    public config = (): void => {
        this.rolesRouter.get('/', [
            validateJWT,
            validateRolFromDB(MODULES.roles, PERMISSIONS.read)
        ], rolesControllerGet.getAllRoles)
        this.rolesRouter.get('/:roleId', [
            validateJWT,
            validateRolFromDB(MODULES.roles, PERMISSIONS.read)
        ], rolesControllerGet.getRolePermissionsById)
    }
}
```
