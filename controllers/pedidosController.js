import PedidosModel from "../models/PedidosModel.js";
import mongoose from "mongoose";

//New order 

const newOrder = async (req, res, next) =>{

    const pedido = new PedidosModel(req.body);

    try {
        await pedido.save();
        res.json({msg:'Se agregó un nuevo pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// show all orders 

const showOrders = async(req, res, next) =>{

    try {

        const orders = await PedidosModel.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'ProductosModel'
        });

        res.json(orders);
        
    } catch (error) {
        
        console.log(error);
        next();
    }

}

// show order by id

const get_orderById = async(req, res, next)=>{

    const {id} = req.params || null;

    let order;

    try {
        
        order = await PedidosModel.findById(id).populate('cliente').populate({
            path:'pedido.producto',
            model:'ProductosModel'
        });

    } catch (error) {

        orderError(error, order)
    }

    if (!order) {
        res.json({message:'No existe el pedido'});
        return next();
    } else {
        res.json({message:order})
    }

}

// Update pedido by id

const put_updateOrder = async (req, res, next) =>{

    const {id} = req.params;

    let order;

    try {
        
        order = await PedidosModel.findByIdAndUpdate(id, req.body, {new: true})
        .populate('cliente')
        .populate({
            path:'pedido.producto',
            model:'ProductosModel' 
        })

    } catch (error) {
        
        orderError(error, order);
    }

    if (!order) {
        res.json({message:'No existe el pedido'});
        return next();
    } else {
        res.json({message:order})
    }

}

const delete_order = async (req, res, next) =>{

    const {id} = req.params;

    let order; 

    try {
        
        order = await PedidosModel.findByIdAndDelete(id);
        
    } catch (error) {
        
        orderError(error, order)
    }

    if (!order) {
        res.json({message:'No existe el pedido'});
        return next();
    } else {
        res.json({message:'Se ha eliminado correctamente'})
    }

}

const orderError = (error, order)=>{
    if (error instanceof mongoose.CastError) {
        order = null;
      } else {
        throw error;
      }
}



export {
    newOrder,
    showOrders,
    get_orderById,
    put_updateOrder,
    delete_order
}