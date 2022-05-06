/**
 * @author Carlos Páez
 */
export interface ParamsUserDAO_GETAll {
    from: number
    limit: number
    all: boolean
}
/**
 * @author Carlos Páez
 */
export interface ParamsUserDAO_GETByID {
    document: string | number
}


/**
 * @author Carlos Páez
 */
export interface ParamsUserDAO_POST {
    documento: number | string
    tipo_documento: string
    nombres:  string
    apellidos: string    
    username: string 
    email: string
    numero_contacto: string | number
    password: string
}


/**
 * @author Carlos Páez
 */
export interface ParamsUserDAO_PUTUpdate {
    document: number | string
    tipo_documento: string
    nombres:  string
    apellidos: string    
    username: string 
    email: string
    numero_contacto: string | number
    password: string
}
/**
 * @author Carlos Páez
 */
export interface ParamsUserDAO_PUTEnable {
    document: string | number
}


/**
 * @author Carlos Páez
 */
export interface ParamsUserDAO_DELETEDisable {
    document: string | number
}
/**
 * @author Carlos Páez
 */
export interface ParamsUserDAO_DELETEDestroy {
    document: string | number
}