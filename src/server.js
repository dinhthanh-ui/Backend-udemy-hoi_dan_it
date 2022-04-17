import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import initializeWebRoute from './routes/web';
import viewEngine from './config/configViewEngine';
import connectDB from './config/connectDB'
require('dotenv').config();
const app = express();

/**
 * @Initialize Morgan Request
 */
morgan('tiny');
/**
 * @Initialize Body Parser 
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * @Initialize route Request
 */
initializeWebRoute(app);
/**
 * @Initialize view Engine Request
 */
viewEngine(app);

/**
 * @param {*} Connect DATABASE 
 */
connectDB();
/**
 * @Initialize SERVER Request
 */
let PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(">>>> Backend Server listening on port: ", PORT);
})