/**
 * @author Sergio Gil
 */
 export interface ParamsFacultyUserDAO_GETAll {
    from: number
    limit: number
}

export interface ParamsFacultyUserDAO_GETByID {
    facultyUserId: number | string
}

export interface ParamsFacultyUserDAO_POST {
    documento_usuario: string
}

export interface ParamsFacultyUserDAO_PUT {
    facultyUserId: number | string
    documento_usuario: string
}

export interface ParamsFacultyUserDAO_DELETE {
    facultyUserId: number | string
}