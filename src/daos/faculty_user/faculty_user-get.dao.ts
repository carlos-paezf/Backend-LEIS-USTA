import { Response } from "express";
import { ParamsFacultyUserDAO_GETAll, ParamsFacultyUserDAO_GETByID } from "../../helpers/interfaces/faculty_user.interface";
import { FACULTY_USER_FIELDS } from "../../helpers/mapping"
import { FacultadUsuarios } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";


export class FacultyUserDAO_GET {
    /**
     * It gets all the faculties users from the database, and returns them in a JSON format
     * 
     * @param {ParamsFacultyUserDAO_GETAll} params 
     * @param {Response} res - Response =&gt; Express response object
     * @returns a Promise of unknown type.
     */
    protected static getAllFacultiesUsers = async (params: ParamsFacultyUserDAO_GETAll, res: Response): Promise<unknown> => {
        try {
            const { from: offset, limit } = params
            if (offset < 0 || limit < 1) return badRequestStatus('El valor mínimo de from es 0, y el mínimo de limit es 1', res)

            const { count, rows } = await FacultadUsuarios.findAndCountAll({
                offset, limit,
                attributes: [
                    FACULTY_USER_FIELDS.ID, FACULTY_USER_FIELDS.DOCUMENT
                ]
            })
            
            return okStatus({ from: offset, limit, count, data: rows }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyUserDAO_GET: ', error, res)
        }
    }


    /**
     * It gets a facultyUser by its ID, and returns it in a JSON object
     * 
     * @param {ParamsFacultyUserDAO_GETByID} params 
     * @param {Response} res - Response
     * @returns a Promise that resolves to an unknown type.
     */
    protected static getFacultyUserById = async (params: ParamsFacultyUserDAO_GETByID, res: Response): Promise<unknown> => {
        try {
            const { facultyUserId: ID } = params

            const facultyUser = await FacultadUsuarios.findByPk(ID, {
                attributes: [ FACULTY_USER_FIELDS.ID, FACULTY_USER_FIELDS.DOCUMENT ]
            })
            if (!facultyUser) return badRequestStatus(`No existe ninguna facultad-usuario con el id ${ID}`, res)

            return okStatus({ facultyUserId: ID, facultyUser }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyUserDAO_GET: ', error, res)
        }
    }
}