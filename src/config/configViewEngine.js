import express from 'express';

/**
 * @Initialize View Engine
 * @param {*} app - express app
 */

const viewEngineConfig = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};
export default viewEngineConfig;