import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
const app = express();
require("dotenv").config();
// ==========================================
/**
 * @Initialize view engine
 */
configViewEngine(app);
/**
 * @Initialize routes with initWebRoutes
 */
initWebRoutes(app);
/**
 * @Initialize Prot for server
 */
const PORT = process.env.PORT || 8888;
// ==========================================
app.listen(PORT, () => {
    console.log(" >>>> Backend in Running Port " + PORT);
})