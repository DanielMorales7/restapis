import ProductosModel from "../models/ProductosModel.js";
import mongoose from 'mongoose';
import multer from "multer";
import shortid from "shortid";
import { fileURLToPath } from "url";

// Opciones de Multer
const filePath = fileURLToPath(new URL('../../resapis/uploads/', import.meta.url));

const fileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        console.log(filePath)
        cb(null, filePath);
    },
    filename: (req, file, cb)=>{
        const extension = file.mimetype.split('/')[1];
        // const extension = file.fieldname + '-' + Date.now()+ filePath;
        cb(null,`${shortid.generate()}.${extension}` );
    }

});

const configuracionMulter = {
    storage: fileStorage,
    limits: { fileSize: 2 * 1024 * 1024},
    fileFilter(req, file,cb){
        if(file.mimetype=== 'image/jpeg' ||  file.mimetype=== 'image/png'){
            // el callaback se ejecuta como true o false: true cuando la imagen se acepta
            cb(null, true);
        }else{
            cb(null, false);
        }  
    }
}

const upload = multer(configuracionMulter).single('imagen');

// Subir un archivo

const uploadFile = (req, res, next) =>{
    upload(req, res, function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next();
    })
}

const newProduct = async(req, res, next) =>{

    const product = new ProductosModel(req.body);

    try {
        
        if(req.file.filename){
            product.imagen = req.file.filename
        }

        await product.save();
        res.json({mensaje:'Se agregó un nuevo cliente'});

    } catch (error) {
        
        res.json({message:error});
        next();
    }
    
}

// Show all products 

const showProducts = async (req, res, next) =>{

    try {
        const products = await ProductosModel.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        next();
    }
}

// show product by id

const showProductById = async (req, res, next) => {

    const {id} = req.params;

    let product;

    try {
       
        product = await ProductosModel.findById(id);

    } catch (error) {
       
        productError(error, product);

    }

    if (!product) {
        res.json({message:'No existe el Producto'});
        return next();
    } else {
      res.json({product})
    }
}

// Update producto

const updateProduct = async(req, res, next) =>{

    const {id} = req.params;

    let oldProduct = await ProductosModel.findById(id);

    let newProduct = req.body;

    (req.file) ? newProduct.imagen = req.file.filename : newProduct.imagen = oldProduct.imagen;

    let product;

    try {
        
        product = await ProductosModel.findByIdAndUpdate(id,req.body,{new:true});

    } catch (error) {
        
        productError(error, product);
    }
    
    if (!product) {
        res.json({message:'No existe el Product'});
    } else {
      res.json({message:product})
    }
}

// delete product by id
const deleteProduct = async(req, res,next) =>{

    const {id} = req.params;

    try {
        
        const product = await ProductosModel.findByIdAndDelete(id);

        res.json({msg:'Se ha eliminado correctamente'});

    } catch (error) {
        
        console.log(error);
        next();
    }
}


const productError = (error, product) =>{

    if (error instanceof mongoose.CastError) {
      product = null;
    } else {
      throw error;
    }
    return product;
}
  

export {newProduct, uploadFile, showProducts, showProductById, updateProduct, deleteProduct}