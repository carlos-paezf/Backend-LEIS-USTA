import { Request, Response } from "express"
import { FacultyUserDAO_DELETE } from "../../daos/faculty_user"


class FacultyUserController_DELETE extends FacultyUserDAO_DELETE {
    /** 
     * 
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    public deleteFacultyUserByID = (req: Request, res: Response) => {
        const { facultyUserId } = req.params
        FacultyUserDAO_DELETE.deleteFacultyUserByID({ facultyUserId }, res)
    }
}
export const facultyUserControllerDelete = new FacultyUserController_DELETE()