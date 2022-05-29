/**
 * @author Sergio Gil
 */
 export interface ParamsFinesUserDAO_GETAll {
    from: number
    limit: number
}

export interface ParamsFinesUserDAO_GETByID {
    finesUserId: number | string
}

export interface ParamsFinesUserDAO_POST {
    documento_usuario: string
}

export interface ParamsFinesUserDAO_PUT {
    finesUserId: number | string
    documento_usuario: string
}
export interface ParamsFinesUserDAO_DELETEDisable {
    finesUserId: number | string
}

export interface ParamsFinesUserDAO_DELETE {
    finesUserId: number | string
}