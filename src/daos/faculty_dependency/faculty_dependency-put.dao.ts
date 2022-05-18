import { Response } from "express";
import { getCurrentDate } from "../../helpers";
import { ParamsFacultyDependencyDAO_PUT } from "../../helpers/interfaces";
import { FACULTY_DEPENDENCY_FIELDS } from "../../helpers/mapping";
import { FacultadDependencia } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";


/** 
 * It updates a facultyDependency by id, if it exists and is enabled. 
 * 
 * @author Carlos Páez
 */
export class FacultyDependencyDAO_PUT {
    /**
     * It updates a facultyDependency by id, if it exists and is enabled
     * 
     * @param {ParamsFacultyDependencyDAO_PUT} params - ParamsFacultyDependencyDAO_PUT
     * @param {Response} res - Response
     * @returns a promise.
     */
    protected static updateFacultyDependencyById = async (params: ParamsFacultyDependencyDAO_PUT, res: Response): Promise<unknown> => {
        try {
            const { facultyDependencyId: id, nombre_facultad_dependencia } = params

            const facultyDependency = await FacultadDependencia.findByPk(id, {
                attributes: [FACULTY_DEPENDENCY_FIELDS.NAME, 'status']
            })
            if (!facultyDependency) return badRequestStatus(`No se encuentra ninguna Facultad-Dependencia con del ${id}`, res)

            if (!facultyDependency.status) return badRequestStatus(`La Facultad-Dependencia ${facultyDependency.nombre_facultad_dependencia}, se encuentra deshabilitada`, res)

            await facultyDependency.update({
                nombre_facultad_dependencia,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Facultad-Dependencia con el id ${id} ha sido actualizada correctamente`, facultyDependency}, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyDependencyDAO_PUT: ', error, res)
        }
    }
}
