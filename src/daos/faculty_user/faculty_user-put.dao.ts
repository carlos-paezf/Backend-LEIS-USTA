import { Response } from "express";
import { getCurrentDate } from "../../helpers";
import { ParamsFacultyUserDAO_PUT } from "../../helpers/interfaces";
import { FACULTY_USER_FIELDS } from "../../helpers/mapping";
import { FacultadUsuarios } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";

/** 
 * It updates a facultyUser by id, if it exists and is enabled. 
 * 
 * @author Carlos Páez
 */
export class FacultyUserDAO_PUT {
    /**
     * It updates a facultyUser by id, if it exists and is enabled
     * 
     * @param {ParamsFacultyUserDAO_PUT} params - ParamsFacultyUserDAO_PUT
     * @param {Response} res - Response
     * @returns a promise.
     */
    protected static updateFacultyUserById = async (params: ParamsFacultyUserDAO_PUT, res: Response): Promise<unknown> => {
        try {
            const { facultyUserId: id, documento_usuario } = params

            const facultyUser = await FacultadUsuarios.findByPk(id, {
                attributes: [FACULTY_USER_FIELDS.DOCUMENT, 'status']
            })
            if (!facultyUser) return badRequestStatus(`No se encuentra ninguna Facultad-Usuario con del ${id}`, res)

            if (!facultyUser.status) return badRequestStatus(`La Facultad-Usuario ${facultyUser.documento_usuario}, se encuentra deshabilitada`, res)

            await facultyUser.update({
                documento_usuario,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Facultad-Usuario con el id ${id} ha sido actualizada correctamente`, facultyUser}, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyUserDAO_PUT: ', error, res)
        }
    }
}
