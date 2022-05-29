export { DataJWT } from './jwt.interface';

export { ParamsAuthDAO_POSTLogin } from './auth.interface';

export {
    ParamsUserDAO_GETAll,
    ParamsUserDAO_GETByID,
    ParamsUserDAO_POST,
    ParamsUserDAO_PUTUpdate,
    ParamsUserDAO_PUTEnable,
    ParamsUserDAO_DELETEDisable,
    ParamsUserDAO_DELETEDestroy
} from './user.interface';

export {
    ParamsRoleDAO_DELETE,
    ParamsRoleDAO_GETAll,
    ParamsRoleDAO_GETByID,
    ParamsRoleDAO_POST,
    ParamsRoleDAO_PUT,
    Permission
} from './role.interface';

export { 
    ParamsFacultyDependencyDAO_GETAll,
    ParamsFacultyDependencyDAO_GETByID,
    ParamsFacultyDependencyDAO_POST,
    ParamsFacultyDependencyDAO_PUT,
    ParamsFacultyDependencyDAO_DELETE
} from './faculty_dependency.interface';

export { 
    ParamsFacultyUserDAO_GETAll,
    ParamsFacultyUserDAO_GETByID,
    ParamsFacultyUserDAO_POST,
    ParamsFacultyUserDAO_PUT,
    ParamsFacultyUserDAO_DELETE
} from './faculty_user.interface';

export { 
    ParamsFinesDAO_GETByID,
    ParamsFinesDAO_POST,
    ParamsFinesDAO_PUT,
    ParamsFinesDAO_GETAll,
    ParamsFinesDAO_DELETE
} from './fines.interface';

export { 
    ParamsFinesUserDAO_GETByID,
    ParamsFinesUserDAO_POST,
    ParamsFinesUserDAO_PUT,
    ParamsFinesUserDAO_GETAll,
    ParamsFinesUserDAO_DELETE
} from './fines_user.interface';