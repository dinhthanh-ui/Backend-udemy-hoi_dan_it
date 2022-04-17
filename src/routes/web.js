import express from 'express';
import apis from '../controllers/apiController'
const route = express.Router();


/**
 * @Initialize route require
 */

const initializeWebRoute = (app) => {

    route.post('/api/create', apis.createNewUser);
    route.get('/api/show', apis.showUser);
    route.delete('/api/delete-user/:id', apis.deleteAnUser);
    route.put('/api/update-user', apis.updateAnUser);
    app.use('/', route);
}
export default initializeWebRoute;