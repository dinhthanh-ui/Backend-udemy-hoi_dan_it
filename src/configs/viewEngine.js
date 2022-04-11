import express from "express";

/**
 * @Initialize view engine config
 * @param {*} app -express app 
 */
const viewEngineConfig = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");

}

export default viewEngineConfig;