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

import {
    newOrder, 
    showOrders,
    get_orderById,
    put_updateOrder,
    delete_order
}
from '../controllers/pedidosController.js'
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

/***** Pedidos *****/
router.route('/orders')
    .post(newOrder)
    .get(showOrders)

router.route('/order/:id')
    .get(get_orderById)
    .put(put_updateOrder)
    .delete(delete_order)

export default router