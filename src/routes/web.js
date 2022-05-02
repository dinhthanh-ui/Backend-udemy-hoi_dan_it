import express from 'express';
import apis from '../controllers/apiController'
import apisUser from '../controllers/userController'
import apisGroup from '../controllers/groupController'
import apisRole from '../controllers/roleController'
import { checkUserJWT, checkUserPermissions } from '../middleware/JWTAction'
const route = express.Router();

/**
 * @Initialize route require
 */
const initializeWebRoute = (app) =>
{
    /**
     * @param {all routes} All
    */
    route.all('*', checkUserJWT, checkUserPermissions)
    /**
     * @param {Login, Register,Account}
     */
    route.post('/login', apis.Login)
    route.post('/register', apis.Register);
    route.post('/logout', apis.Logout);
    route.get('/account', apisUser.getUserAccount)
    /**
     * @param {Create,Show, Update, Delete} for User
     */
    route.post('/user/create', apisUser.createUser);
    route.get('/user/show', apisUser.showUser);
    route.delete('/user/delete', apisUser.deleteUser);
    route.put('/user/update', apisUser.updateUser);
    /**
     * @param {Create,Show, Update, Delete} for Roles was User
     */
    route.post('/role/create', apisRole.createRole);
    route.get('/role/show', apisRole.showRole);
    route.get('/role/allShow', apisRole.showAllRole);
    route.delete('/role/delete', apisRole.deleteRole);
    route.put('/role/update', apisRole.updateRole);
    route.get('/role/by-group/:groupId', apisRole.getRoleByGroup);
    route.post('/role/assign-to-group', apisRole.assignToGroup);
    /**
     * @param {call Apis in Group } for Group
     */
    route.put('/group/update', apisGroup.updateGroup);
    route.delete('/group/delete', apisGroup.deleteGroup);
    route.get('/group/allShow', apisGroup.showAllGroup);
    route.get('/group/show', apisGroup.showGroup);
    route.post('/group/create', apisGroup.createGroup);
    /**
     * 
     */
    app.use('/api/v1', route);



}
export default initializeWebRoute;