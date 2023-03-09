import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const productosSchema = new mongoose.Schema({

    nombre:{
        type: String,
        trim:true
    },
    precio:{
        type:Number
    },
    imagen:{
        type:String
    }

});

const ProductosModel = mongoose.model("ProductosModel",productosSchema);
export default ProductosModel;