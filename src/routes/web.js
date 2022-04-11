import express from "express";

const router = express.Router();


/**
 * @Initialize Routes with initWebRoutes
 * @param {*} app : express app 
 */
const initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send("hello your !!!!")
    })

    app.use('/', router);
};
export default initWebRoutes;