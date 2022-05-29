import { Router } from "express";
import {
  rolesControllerDelete,
  rolesControllerGet,
  rolesControllerPost,
  rolesControllerPut,
} from "../../controllers/roles";
import {
  RoleMiddlewareDELETE,
  RoleMiddlewareGET,
  RoleMiddlewarePOST,
  RoleMiddlewarePUT,
} from "./middlewares";

/**
 * The RolesRoutes class is a class that contains a Router object that is used to create routes
 * for the RolesController class.
 *
 * @author Carlos Páez
 */
class RolesRoutes {
  public rolesRouter: Router;

  /**
   * The constructor function is a special function that is called when an object is created
   * from a class.
   */
  constructor() {
    this.rolesRouter = Router();
    this.config();
  }

  /**
   * A function that is called when the class is instantiated.
   */
  private config = (): void => {
    this.rolesRouter.get(
      "/",
      RoleMiddlewareGET.GET_ALL,
      rolesControllerGet.getAllRoles
    );
    this.rolesRouter.get(
      "/:roleId",
      RoleMiddlewareGET.GET_ROLE,
      rolesControllerGet.getRolePermissionsById
    );

    this.rolesRouter.post(
      "/create",
      RoleMiddlewarePOST.POST_CREATE,
      rolesControllerPost.createRole
    );

    this.rolesRouter.put(
      "/update/:roleId",
      RoleMiddlewarePUT.PUT_UPDATE,
      rolesControllerPut.updateRoleById
    );

    this.rolesRouter.delete(
      "/delete/:roleId",
      RoleMiddlewareDELETE.DELETE_DESTROY,
      rolesControllerDelete.deleteRoleByID
    );
  };
}
const rolesRoutes = new RolesRoutes();
export default rolesRoutes.rolesRouter;