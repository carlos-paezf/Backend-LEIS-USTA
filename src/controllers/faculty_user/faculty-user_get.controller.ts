import { Request, Response } from "express";
import { FacultyUserDAO_GET } from "../../daos/faculty_user";

/** 
 * It's a class that contains two methods, one that gets all the faculties dependencies and 
 * the other that gets a faculty dependency by its id.
 * 
 * @author Carlos Páez
 */
class FacultyUserController_GET extends FacultyUserDAO_GET {
    /**
     * This function gets all faculties usuarios from the database and returns them to the client.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getAllFacultiesUsers = (req: Request, res: Response): void => {
        const { from = 0, limit = 10 } = req.query
        FacultyUserDAO_GET.getAllFacultiesUsers({ from: Number(from), limit: Number(limit) }, res)
    }


    /**
     * This function is a controller that receives a request, calls a DAO function, and sends a response.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getFacultyUserById = (req: Request, res: Response): void => {
        const { facultyUserId } = req.params
        FacultyUserDAO_GET.getFacultyUserById({facultyUserId}, res)
    }
}

export const facultyUserControllerGet = new FacultyUserController_GET()