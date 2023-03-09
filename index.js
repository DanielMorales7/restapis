import express from 'express';
import router from './routes/index.js';
import dotenv from  'dotenv';
import conectarDB from './config/bd.js';
import bodyParser from 'body-parser'

//crear el servidor
const app = express();

//Habilitamos bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//se realiza conexión DB
conectarDB();

//rutas de la app
app.use('/', router);


//puerto
app.listen(5000);