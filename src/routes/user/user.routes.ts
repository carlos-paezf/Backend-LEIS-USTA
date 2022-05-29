import { Router } from "express";
import {
  userControllerDelete,
  userControllerGet,
  userControllerPost,
  userControllerPut,
} from "../../controllers/users";
import {
  UserMiddlewareDELETE,
  UserMiddlewareGET,
  UserMiddlewarePOST,
  UserMiddlewarePUT,
} from "./middlewares";

/**
 * The UserRoutes class is a class that contains a Router object that is used to create routes
 * for the UserController class.
 *
 * @author Carlos Páez
 */
class UserRoutes {
  public userRoutes: Router;

  /**
   * The constructor function is a special function that is called when an object is created
   * from a class.
   */
  constructor() {
    this.userRoutes = Router();
    this.config();
  }

  /**
   * A function that is called when the class is instantiated.
   */
  private config = () => {
    this.userRoutes.get(
      "",
      UserMiddlewareGET.GET_ALL,
      userControllerGet.getAllUsers
    );
    this.userRoutes.get(
      "/:document",
      UserMiddlewareGET.GET_DOCUMENT,
      userControllerGet.getUserByDocument
    );

    this.userRoutes.post(
      "/create",
      UserMiddlewarePOST.POST_CREATE,
      userControllerPost.createUser
    );

    this.userRoutes.put(
      "/update/:document",
      UserMiddlewarePUT.PUT_UPDATE,
      userControllerPut.updateUserByDocument
    );

    this.userRoutes.put(
      "/enable/:document",
      UserMiddlewarePUT.PUT_ENABLE,
      userControllerPut.enableUserByDocument
    );

    this.userRoutes.delete(
      "/disable/:document",
      UserMiddlewareDELETE.DELETE_DISABLE,
      userControllerDelete.disableUserByDocument
    );
    
    this.userRoutes.delete(
      "/remove/:document",
      UserMiddlewareDELETE.DELETE_DESTROY,
      userControllerDelete.permanentlyDeleteUserByDocument
    );
  };
}

const userRoutes = new UserRoutes();
export default userRoutes.userRoutes;