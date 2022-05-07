import { Request, Response } from "express";
import { FacultyDependencyDAO_GET } from "../../daos/faculty_dependency";


/** 
 * It's a class that contains two methods, one that gets all the faculties dependencies and 
 * the other that gets a faculty dependency by its id.
 * 
 * @author Carlos Páez
 */
class FacultyDependencyController_GET extends FacultyDependencyDAO_GET {
    /**
     * This function gets all faculties dependencies from the database and returns them to the client.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getAllFacultiesDependencies = (req: Request, res: Response): void => {
        const { from = 0, limit = 10 } = req.query
        FacultyDependencyDAO_GET.getAllFacultiesDependencies({ from: Number(from), limit: Number(limit) }, res)
    }


    /**
     * This function is a controller that receives a request, calls a DAO function, and sends a response.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public getFacultyDependencyById = (req: Request, res: Response): void => {
        const { facultyDependencyId } = req.params
        FacultyDependencyDAO_GET.getFacultyDependencyById({facultyDependencyId}, res)
    }
}


export const facultyDependencyControllerGet = new FacultyDependencyController_GET()