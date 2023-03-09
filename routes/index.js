import express from 'express';
import { 
nuevoCliente, 
mostrarClientes,
clienteById, 
updateCliente,
deleteClient
} from '../controllers/clienteController.js';

import {
    newProduct,
    uploadFile,
    showProducts,
    showProductById,
    updateProduct,
    deleteProduct
}
from '../controllers/productosController.js'
const router = express.Router();

/** CLIENTES **/

//agrega clientes
router.route('/clientes')
    .post(nuevoCliente)
    .get(mostrarClientes)

// CRUD de cliente 
router.route('/cliente/:id')
    .get(clienteById)
    .put(updateCliente)
    .delete(deleteClient)

/** PRODUCTOS **/

//agregar nuevos productos

router.route('/productos')
    .post(uploadFile,newProduct)
    .get(showProducts)

router.route('/producto/:id')
    .get(showProductById)
    .put(uploadFile, updateProduct)
    .delete(deleteProduct) 


export default router