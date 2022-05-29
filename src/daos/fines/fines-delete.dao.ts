import { Response } from "express"
import { getCurrentDate } from "../../helpers"
import { ParamsFinesDAO_DELETE } from "../../helpers/interfaces/fines.interface";
import { FINES_FIELDS } from "../../helpers/mapping/fines.fields";
import { MultasUsuarios, Multas } from "../../models";
import { badRequestStatus, internalServerErrorStatus, okStatus } from "../status_responses";

export class FinesDAO_DELETE{
   /**
     * @param {ParamsFinesDAO_DELETE} params
     * @param {Response} res - Response
     * @returns 
     */
    public static deleteFinesByID = async (params: ParamsFinesDAO_DELETE, res: Response): Promise<unknown> => {
        try {
            const { finesId } = params

            const fines = await Multas.findByPk(finesId, {
                attributes: [FINES_FIELDS.ID, FINES_FIELDS.NAME, "status", "updated_at"]
            })
            if (!fines) return badRequestStatus(`No se encuentra ningúna Multa con el id ${finesId}`, res)

            const name_fines = fines.nombre_multa

            if (!fines.status) return badRequestStatus(`La Multa '${name_fines}', ya se encuentra deshabilitada`, res)

            await MultasUsuarios.update({
                status: false,
                updated_at: getCurrentDate()
            }, {
                where: { 'id_multa': finesId }
            })

            await fines.update({
                status: false,
                updated_at: getCurrentDate()
            })

            return okStatus({ msg: `La Multa '${name_fines}' con el id ${finesId}, ha sido eliminado exitosamente` }, res)
        } catch (error) {
            return internalServerErrorStatus('Error in FinesDAO_DELETE', error, res)
        }
    }
}