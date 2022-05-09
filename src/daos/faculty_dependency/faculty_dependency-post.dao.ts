import { Response } from "express";
import { ParamsFacultyDependencyDAO_POST } from "../../helpers/interfaces";
import { FACULTY_DEPENDENCY_FIELDS } from "../../helpers/mapping";
import { FacultadDependencia } from "../../models";
import { createdStatus, internalServerErrorStatus } from "../status_responses";


/** 
 * It creates a new faculty dependency in the database
 *
 * @author Carlos Páez 
 */
export class FacultyDependencyDAO_POST {
    /**
     * It creates a new faculty dependency in the database
     * @param {ParamsFacultyDependencyDAO_POST} params - ParamsFacultyDependencyDAO_POST
     * @param {Response} res - Response
     * @returns a Promise.
     */
    protected static postFacultyDependency = async (params: ParamsFacultyDependencyDAO_POST, res: Response): Promise<unknown> => {
        try {
            const { nombre_facultad_dependencia } = params

            const facultyDependency = await FacultadDependencia.create({
                nombre_facultad_dependencia,
                created_at: new Date(),
                updated_at: new Date()
            }, {
                returning: [ FACULTY_DEPENDENCY_FIELDS.ID, FACULTY_DEPENDENCY_FIELDS.NAME ]
            })

            return createdStatus({ facultyDependency }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyDependencyDAO_POST: ', error, res)
        }
    }
}