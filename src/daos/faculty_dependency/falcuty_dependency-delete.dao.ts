import { Response } from "express"
import { getCurrentDate } from "../../helpers"
import { ParamsFacultyDependencyDAO_DELETE } from "../../helpers/interfaces/faculty_dependency.interface";
import { FACULTY_DEPENDENCY_FIELDS } from "../../helpers/mapping";
import { FacultadDependencia, FacultadUsuarios } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";

export class FacultyDependencyDAO_DELETE{
   /**
     * @param {ParamsFacultyDependencyDAO_DELETE} params
     * @param {Response} res - Response
     * @returns 
     */
    public static deleteFacultyDependencyByID = async (params: ParamsFacultyDependencyDAO_DELETE, res: Response): Promise<unknown> => {
        try {
            const { facultyDependencyId } = params

            const faculty_dependency = await FacultadDependencia.findByPk(facultyDependencyId, {
                attributes: [FACULTY_DEPENDENCY_FIELDS.ID, FACULTY_DEPENDENCY_FIELDS.NAME, "status", "updated_at"]
            })
            if (!faculty_dependency) return badRequestStatus(`No se encuentra ningúna Facultad Dependencia con el id ${facultyDependencyId}`, res)

            const name_facultyDependency = faculty_dependency.nombre_facultad_dependencia

            if (!faculty_dependency.status) return badRequestStatus(`La facultad '${name_facultyDependency}', ya se encuentra deshabilitado`, res)

            await FacultadUsuarios.update({
                status: false,
                updated_at: getCurrentDate()
            }, {
                where: { 'id_facultad': facultyDependencyId }
            })

            await faculty_dependency.update({
                status: false,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Facultad '${name_facultyDependency}' con el id ${facultyDependencyId}, ha sido eliminado exitosamente` }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyDependencyDAO_DELETE', error, res)
        }
    }
}