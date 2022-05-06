import { Response } from "express";
import { internalServerErrorStatus } from "../status_responses";


export class FacultyDependencyDAO_GET {
    protected static getAllFacultiesDependencies = async (params: any, res: Response): Promise<unknown> => {
        try {
            return
        } catch (error) {
            return internalServerErrorStatus('Error in FacultyDependencyDAO_GET: ', error, res)
        }
    }
}