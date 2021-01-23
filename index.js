const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path : 'variables.env'});
// Cors permite que un cliente  se conecta a otro servidor para intercambio de recursos
const cors = require('cors');


// Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
});



// Crear el servidor
const app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


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