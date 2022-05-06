/**
 * @author Carlos Páez
 */
export interface Permission {
    id_rol: string | number
    id_modulo: string | number
    id_permiso: string | number
}


/**
 * @author Carlos Páez
 */
export interface ParamsRoleDAO_GETAll {
    from: number
    limit: number
}
/**
 * @author Carlos Páez
 */
export interface ParamsRoleDAO_GETByID {
    roleId: string | number
}


/**
 * @author Carlos Páez
 */
export interface ParamsRoleDAO_POST {
    roleId: string | number
    rol_nombre: string
    rol_descripcion: string
    permisos: Permission[] | any
}


/**
 * @author Carlos Páez
 */
export interface ParamsRoleDAO_PUT {
    roleId: string | number
    rol_nombre: string
    rol_descripcion: string
    permisos: Permission[] | any
}


/**
 * @author Carlos Páez
 */
export interface ParamsRoleDAO_DELETE {
    roleId: string | number
}