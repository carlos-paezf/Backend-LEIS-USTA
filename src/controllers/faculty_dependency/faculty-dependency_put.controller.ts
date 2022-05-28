import { Request, Response } from "express";
import { FacultyDependencyDAO_PUT } from "../../daos/faculty_dependency";

class FacultyDependencyController_PUT extends FacultyDependencyDAO_PUT {
    /**
     * @param {Request} req - Request - This is the request object that contains the request data.
     * @param {Response} res - Response -&gt; this is the response object that is passed to the
     * function
     */
    public updateFacultyDependencyById = (req: Request, res: Response): void => {
        const { facultyDependencyId } = req.params
        FacultyDependencyDAO_PUT.updateFacultyDependencyById({ facultyDependencyId, ...req.body }, res)
    }
}

export const facultyDependencyControllerPut = new FacultyDependencyController_PUT()