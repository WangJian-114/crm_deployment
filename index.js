const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path : 'variables.env'});
// Cors permite que un cliente  se conecta a otro servidor para intercambio de recursos
const cors = require('cors');


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
});


// Crear el servidor
const app = express();


// Carpeta publica // para que muestra imagen en el react
app.use(express.static('uploads'));


// Habilitar bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// Definir un dominio para recibir las peticiones
/*
const whitelist = [process.env.FRONTEND_URL];
const corsOpcions = {

    origin: (origin, callback) => {

        // Revisar si la peticion viene de un servidor que esta en la lista whitelist
        const existe = whitelist.some( dominio => dominio === origin );
        if(existe){
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }

    }

}
*/


// Habilitar cors 
app.use(cors());

// Rutas de la app
app.use('/', routes());









const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;



// iniciar app 
app.listen(port, host, ()=>{
    console.log('El servidor esta funcionando');
});