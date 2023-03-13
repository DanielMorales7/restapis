import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;

const pedidosSchema = new mongoose.Schema({

    cliente:{
        type: Schema.ObjectId,
        ref: 'ClientesModel'
    },
    pedido:[{
        producto:{
            type:Schema.ObjectId,
            ref: 'ProductosModel'
        },
        cantidad:Number
    }],
    total:{
        type: Number
    }

});

const PedidosModel = mongoose.model("PedidosModel",pedidosSchema);
export default PedidosModel;