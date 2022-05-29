/**
 * @author Sergio Gil
 */
 export interface ParamsFinesDAO_GETAll {
    from: number
    limit: number
}
export interface ParamsFinesDAO_GETByID {
    finesId: number | string
}

export interface ParamsFinesDAO_POST {
    nombre_multa: string,
    precio: number | string,
    descripcion_multa: string 
}

export interface ParamsFinesDAO_PUT {
    finesId: number | string
    nombre_multa: string
}

export interface ParamsFinesDAO_DELETE {
    finesId: number | string
}