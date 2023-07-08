import express from 'express'
//import {getProducts,addProduct,deleteByIdProduct, updateById, renderHome,realTimeProducts} from './controllers/productController.js';
//import { addCart,getCart,putProductToCart } from './controllers/cartController.js';
import { createCartAndAddAProduct,
         deleteProductFromCart,
         emptyTheCart,
         getPopulatedCart,
         updateQuantityOfProductsInCart,
         addProductsToCart } from './controllers/cart.controller.js';

import { getProductById,
         addProduct,
         deleteByIdProduct,
         realTimeProducts,
         renderHome,
         updateByIdProduct, 
         getPaginatedProducts} from './controllers/product.controller.js'; 

const router = express.Router();


router.get('/api/products/:id?',getProductById);
router.get('/products',getPaginatedProducts)
router.post('/api/products/',addProduct)
router.put('/api/products/:id',updateByIdProduct)
router.delete('/api/products/:id',deleteByIdProduct)

//router.get('/api/cart/:cid',getPopulatedCart);
router.post('/api/cart/:pid',createCartAndAddAProduct);
router.post('/api/cart/:cid/products/:pid',updateQuantityOfProductsInCart);
router.put('/api/cart/:cid', addProductsToCart)
router.delete('/api/cart/:cid/products/:pid', deleteProductFromCart)
router.delete('/api/cart/:cid',emptyTheCart)

router.get('/realtimeproducts',realTimeProducts)
router.get('/home',renderHome)
router.get('/cart/:cid',getPopulatedCart)


export {router}