import { Router } from "express";
import { finesControllerGet, finesControllerPost, finesControllerPut, finesControllerDelete} from "../../controllers/fines";
import { FinesMiddlewareGET, FinesMiddlewarePOST, FinesMiddlewarePUT, FinesMiddlewareDELETE } from "./middlewares";

/** 
 * This class is a router that handles all the requests that are related to 
 * the fines model.
 * 
 * @author Sergio Gil
 */
class FinesRouter {
    public finesRouter: Router
    /**
     * The constructor function is a special function that is called when an object is created 
     * from a class.
     */
    constructor() {
        this.finesRouter = Router()
        this.config()
    }

    /**
     * A function that is called when the class is instantiated. 
     */
    private config = (): void => {
        this.finesRouter.get(
            '/',
            FinesMiddlewareGET.GET_ALL,
            finesControllerGet.getAllFines
        )
        this.finesRouter.get(
            '/:finesId',
            FinesMiddlewareGET.GET_FINES,
            finesControllerGet.getFinesById
        )

        this.finesRouter.post(
            '/create',
            FinesMiddlewarePOST.POST_CREATE,
            finesControllerPost.postFines
        )
        this.finesRouter.put(
            "/update/:finesId",
            FinesMiddlewarePUT.PUT_UPDATE,
            finesControllerPut.updateFinesById
          );

          this.finesRouter.delete(
            "/disable/:finesId",
            FinesMiddlewareDELETE.DELETE_DISABLE,
            finesControllerDelete.disableFinesByDocument
          );
          
          this.finesRouter.delete(
            "/delete/:finesId",
            FinesMiddlewareDELETE.DELETE_DESTROY,
            finesControllerDelete.deleteFinesByID
          );
    }
}

const finesRoutes = new FinesRouter()
export default finesRoutes.finesRouter