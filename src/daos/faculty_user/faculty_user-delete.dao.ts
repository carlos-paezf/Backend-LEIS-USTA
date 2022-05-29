import { Response } from "express"
import { getCurrentDate } from "../../helpers"
import { ParamsFacultyUserDAO_DELETE } from "../../helpers/interfaces";
import { FACULTY_USER_FIELDS } from "../../helpers/mapping";
import { FacultadUsuarios, Usuarios } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";

export class FacultyUserDAO_DELETE{
   /**
     * @param {ParamsFacultyUserDAO_DELETE} params
     * @param {Response} res - Response
     * @returns 
     */
    public static deleteFacultyUserByID = async (params: ParamsFacultyUserDAO_DELETE, res: Response): Promise<unknown> => {
        try {
            const { facultyUserId } = params

            const faculty_user = await FacultadUsuarios.findByPk(facultyUserId, {
                attributes: [FACULTY_USER_FIELDS.ID, FACULTY_USER_FIELDS.DOCUMENT, "status", "updated_at"]
            })
            if (!faculty_user) return badRequestStatus(`No se encuentra ningúna Facultad Usuario con el id ${facultyUserId}`, res)

            const name_facultyUser = faculty_user.documento_usuario

            if (!faculty_user.status) return badRequestStatus(`La facultad '${name_facultyUser}', ya se encuentra deshabilitado`, res)

            await Usuarios.update({
                status: false,
                updated_at: getCurrentDate()
            }, {
                where: { 'documento': facultyUserId }
            })

            await faculty_user.update({
                status: false,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Facultad '${name_facultyUser}' con el id ${facultyUserId}, ha sido eliminado exitosamente` }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyUserDAO_DELETE', error, res)
        }
    }
}