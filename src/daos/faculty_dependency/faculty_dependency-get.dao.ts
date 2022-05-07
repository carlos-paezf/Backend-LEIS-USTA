import { Response } from "express";
import { ParamsFacultyDependencyDAO_GETAll, ParamsFacultyDependencyDAO_GETByID } from "../../helpers/interfaces";
import { FACULTY_DEPENDENCY_FIELDS } from "../../helpers/mapping";
import { FacultadDependencia } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";


/**
 * It gets all the faculties dependencies from the database, and returns them in a JSON format
 * 
 * @author Carlos Páez
 */
export class FacultyDependencyDAO_GET {
    /**
     * It gets all the faculties dependencies from the database, and returns them in a JSON format
     * 
     * @param {ParamsFacultyDependencyDAO_GETAll} params - ParamsFacultyDependencyDAO_GETAll
     * @param {Response} res - Response =&gt; Express response object
     * @returns a Promise of unknown type.
     */
    protected static getAllFacultiesDependencies = async (params: ParamsFacultyDependencyDAO_GETAll, res: Response): Promise<unknown> => {
        try {
            const { from: offset, limit } = params
            if (offset < 0 || limit < 1) return badRequestStatus('El valor mínimo de from es 0, y el mínimo de limit es 1', res)

            const { count, rows } = await FacultadDependencia.findAndCountAll({
                offset, limit,
                attributes: [
                    FACULTY_DEPENDENCY_FIELDS.ID, FACULTY_DEPENDENCY_FIELDS.NAME
                ]
            })
            
            return okStatus({ from: offset, limit, count, data: rows }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyDependencyDAO_GET: ', error, res)
        }
    }


    /**
     * It gets a facultyDependency by its ID, and returns it in a JSON object
     * 
     * @param {ParamsFacultyDependencyDAO_GETByID} params - ParamsFacultyDependencyDAO_GETByID
     * @param {Response} res - Response
     * @returns a Promise that resolves to an unknown type.
     */
    protected static getFacultyDependencyById = async (params: ParamsFacultyDependencyDAO_GETByID, res: Response): Promise<unknown> => {
        try {
            const { facultyDependencyId: ID } = params

            const facultyDependency = await FacultadDependencia.findByPk(ID, {
                attributes: [ FACULTY_DEPENDENCY_FIELDS.ID, FACULTY_DEPENDENCY_FIELDS.NAME ]
            })
            if (!facultyDependency) return badRequestStatus(`No existe ninguna facultad-dependencia con el id ${ID}`, res)

            return okStatus({ facultyDependencyId: ID, facultyDependency }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyDependencyDAO_GET: ', error, res)
        }
    }
}