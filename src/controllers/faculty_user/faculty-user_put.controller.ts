import { Request, Response } from "express";
import { FacultyUserDAO_PUT } from "../../daos/faculty_user";

class FacultyUserController_PUT extends FacultyUserDAO_PUT {
    /**
     * @param {Request} req - Request - This is the request object that contains the request data.
     * @param {Response} res - Response -&gt; this is the response object that is passed to the
     * function
     */
    public updateFacultyUserById = (req: Request, res: Response): void => {
        const { facultyUserId } = req.params
        FacultyUserDAO_PUT.updateFacultyUserById({ facultyUserId, ...req.body }, res)
    }
}

export const facultyUserControllerPut = new FacultyUserController_PUT()