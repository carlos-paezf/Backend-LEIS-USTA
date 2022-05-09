/**
 * @author Carlos Páez
 */
export interface ParamsFacultyDependencyDAO_GETAll {
    from: number
    limit: number
}
/**
 * @author Carlos Páez
 */
export interface ParamsFacultyDependencyDAO_GETByID {
    facultyDependencyId: number | string
}


/**
 * @author Carlos Páez
 */
export interface ParamsFacultyDependencyDAO_POST {
    nombre_facultad_dependencia: string
}