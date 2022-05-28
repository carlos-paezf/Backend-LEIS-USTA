import { Request, Response } from "express"
import { FacultyDependencyDAO_DELETE } from "../../daos/faculty_dependency"


class FacultyDependencyController_DELETE extends FacultyDependencyDAO_DELETE {
    /**
     * This function takes in a request and a response, and then calls the deleteRoleByID function from the
     * RolesDAO_DELETE file, passing in the roleId from the request params and the response.
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public deleteFacultyDependencyByID = (req: Request, res: Response) => {
        const { facultyDependencyId } = req.params
        FacultyDependencyDAO_DELETE.deleteFacultyDependencyByID({ facultyDependencyId }, res)
    }
}
export const facultyDependencyControllerDelete = new FacultyDependencyController_DELETE()