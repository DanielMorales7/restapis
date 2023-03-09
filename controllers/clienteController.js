import ClientesModel from "../models/ClientesModel.js";
import mongoose from 'mongoose';

// Agrega un nuevo cliente
const nuevoCliente = async (req, res, next) =>{
    // console.log(req.body);

    const cliente = new ClientesModel(req.body);

    try {
        //almacenar registro
        await cliente.save();
        res.json({mensaje:'Se agregó un nuevo cliente'});
    } catch (error) {
        console.log(error);
        next();

    }

}

//Muestra todos los clientes
const mostrarClientes = async (req, res, next) =>{

    try {

        const clientes = await ClientesModel.find({});
        res.json({clientes})
        
    } catch (error) {
        console.log(error);
        next();
    }

}

// Mostrar un cliente en especifico
const clienteById = async (req, res, next) =>{

    const {id} = req.params;

    let cliente;

    try {

      cliente = await ClientesModel.findById(id);

    }catch (error) {

      clientError(error);

    }
    
    if (!cliente) {
        res.json({message:'No existe el Usuario'});
    } else {
      res.json({cliente})
    }
}

// Actualizar un cliente
const updateCliente = async(req, res) =>{

  const {id} = req.params;

  let cliente;

  try {

    cliente = await ClientesModel.findByIdAndUpdate(id,req.body,{new : true });
    
  } catch (error) {
    
    clientError(error);

  }
    
  if (!cliente) {
      res.json({message:'No existe el Cliente'});
  } else {
    res.json({message:'Se ha actualizdo correctamente'})
  }
}

//Delete client by id

const deleteClient = async(req, res) =>{

  const {id} = req.params;

  let cliente;

  try {

    cliente = await ClientesModel.findByIdAndDelete(id);
    
  } catch (error) {
    clientError(error);
  }

  if (!cliente) {
    res.json({message:'No existe el Cliente'});
  } else {
    res.json({message:'Se ha borrado correctamente'})
  }

}

const clientError = (error) =>{

  if (error instanceof mongoose.CastError) {
    cliente = null;
  } else {
    throw error;
  }
}


export {nuevoCliente, mostrarClientes, clienteById, updateCliente, deleteClient}