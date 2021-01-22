const  Clientes = require('../models/Clientes');


// Agregar un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {

        // almacenar el registro
        await cliente.save();
        res.json({ mensaje : 'Se agrego correctamente un nuevo cliente' });

    }catch (error) {
        // si hay error, console.log y next
        res.send(error);
        next();

    }
}


// Muestra todos los clientes

exports.mostrarClientes = async (req, res, next) => {

    try{
        const clientes = await Clientes.find({});
        res.json(clientes);

    }catch (error) {
        console.log(error);
    }
}

// Muestra un cliente por su ID

exports.mostrarCliente = async (req, res, next) => {

    try{
        const cliente = await Clientes.findById( req.params.idCliente);

        if(!cliente){
            res.json({ mensaje: 'Ese cliente no existe' });
            next()
        }

        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.json({ mensaje : error });
        next();

    }

    
}

// Actualizar un cliente por su id

exports.actualizarCliente =async (req, res, next) => {

    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, req.body, {
            new: true  // traer el valor nuevo

        })
        res.json(cliente);

    } catch (error) {
        res.send(error);
        next();
    }

}

// Eliminar un cliente por su id
exports.eliminarCliente = async (req, res, next) => {
    try{
        await Clientes.findOneAndDelete({ _id : req.params.idCliente });
        res.json({ mensaje : 'El cliente se ha eliminado' });
    }catch (error) {
        console.log(error);
        next();
    }
}