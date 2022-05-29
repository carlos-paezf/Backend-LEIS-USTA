import { Router } from "express";
import { finesUserControllerGet, finesUserControllerPost, finesUserControllerPut, finesUserControllerDelete } from "../../controllers/fines_user";
import { FinesUserMiddlewareGET, FinesUserMiddlewarePOST, FinesUserMiddlewarePUT, FinesUserMiddlewareDELETE  } from "./middlewares";

class FinesUserRouter {
    public finesUserRouter: Router
    /**
     * The constructor function is a special function that is called when an object is created 
     * from a class.
     */
    constructor() {
        this.finesUserRouter = Router()
        this.config()
    }

    /**
     * A function that is called when the class is instantiated. 
     */
    private config = (): void => {
        this.finesUserRouter.get(
            '/',
            FinesUserMiddlewareGET.GET_ALL,
            finesUserControllerGet.getAllFinesUsers
        )
        this.finesUserRouter.get(
            '/:finesUserId',
            FinesUserMiddlewareGET.GET_FINES_USER,
            finesUserControllerGet.getFinesUserById
        )

        this.finesUserRouter.post(
            '/create',
            FinesUserMiddlewarePOST.POST_CREATE,
            finesUserControllerPost.postFinesUser
        )
        this.finesUserRouter.put(
            "/update/:finesUserId",
            FinesUserMiddlewarePUT.PUT_UPDATE,
            finesUserControllerPut.updateFinesUserById
          );
          this.finesUserRouter.delete(
            "/disable/:finesUserId",
            FinesUserMiddlewareDELETE.DELETE_DISABLE,
            finesUserControllerDelete.disableFinesUserByDocument
          );

          this.finesUserRouter.delete(
            "/delete/:finesUserId",
            FinesUserMiddlewareDELETE.DELETE_DESTROY,
            finesUserControllerDelete.deleteFinesUserByID
          );
    }
}

const finesUserRoutes = new FinesUserRouter()
export default finesUserRoutes.finesUserRouter