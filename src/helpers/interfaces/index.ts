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
    ParamsFacultyDependencyDAO_GETByID
} from './faculty_dependency.interface';