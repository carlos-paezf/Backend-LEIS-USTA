import { Response } from "express";
import { ParamsFacultyUserDAO_POST } from "../../helpers/interfaces";
import { FACULTY_USER_FIELDS } from "../../helpers/mapping";
import { createdStatus, internalServerErrorStatus } from "../status_responses";
import { getCurrentDate } from '../../helpers';
import { FacultadUsuarios } from "../../models";

/** 
 * It creates a new faculty Usuario in the database
 *
 * @author Carlos Páez 
 */
export class FacultyUserDAO_POST {
    /**
     * It creates a new faculty users in the database
     * @param {ParamsFacultyUserDAO_POST} params ParamsFacultyUserDAO_POST
     * @param {Response} res - Response
     * @returns a Promise.
     */
    protected static postFacultyUser = async (params: ParamsFacultyUserDAO_POST, res: Response): Promise<unknown> => {
        try {
            const { documento_usuario } = params

            const facultyUser = await FacultadUsuarios.create({
                documento_usuario,
                status: true,
                created_at: getCurrentDate(),
                updated_at: getCurrentDate()
            }, {
                returning: [ FACULTY_USER_FIELDS.ID, FACULTY_USER_FIELDS.DOCUMENT ]
            })

            return createdStatus({ facultyUser }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyUserDAO_POST: ', error, res)
        }
    }
}