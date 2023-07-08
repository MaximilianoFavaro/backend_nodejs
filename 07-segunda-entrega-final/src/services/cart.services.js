import { CartModel } from "../DAO/models/carts.model.js";
import { EMSGS } from "../constants/constants.js";

class CartsServices {

    async getAllCarts () {
        try {
            const carts = await CartModel.find({})
            return carts
        } catch (error) {
            throw EMSGS.CARTS.ERROR_GET_ALL
        }
    }

    async deleteProductFromCart(cartId, productId){
        try {
            const cart = await CartModel.findOne({_id:cartId}).then((car) => {            
                car.products=car.products.filter( data => data._id !== productId )
                car.save()                
            })
            .catch((err) => {
                console.log('Error en deleteProductFromCart ',err)
                throw EMSGS.CART.ERROR_PUT_CART; 
            })            
            return cart;           

        } catch (error) {
            throw EMSGS.CART.ERROR_PUT_CART;            
        }
    }

    async addProductsToCart (cartId, arrayProducts){
        try {
            const cart = await CartModel.findOne({_id: cartId})
            .then((car) =>{                
                const combinedArray = [...car.products, ...arrayProducts];
                
                const resultObject = {};
                combinedArray.forEach((item) => {
                    const { _id, quantity } = item;
                    if (!resultObject[_id]) {
                        resultObject[_id] = quantity;
                    } else {
                        resultObject[_id] += quantity;
                    }
                });                  
                const finalArray = Object.keys(resultObject).map((_id) => ({ _id, quantity: resultObject[_id] }));
                car.products=finalArray;
                console.log("Mostrando el carrito actualizado ",car.products)

                car.save()
                .then((updatedCart)=>{ console.log("Carrito actualizado",updatedCart)})
                console.log('dentro de then')
                
                
            })
            .catch((err) =>{
                console.log(err)
                throw 'Error al cargar los productos en el carrito'
            })
            console.log('por retornar cart')
            return cart;

        } catch (error) {
            console.log ('Error en addProductsToCart', error)
            throw EMSGS.CART.ERROR_PUT_CART
        }
    }

    async updateQuantityOfProducts(cartId,productId,newQuantity){
        try {
            const cart = await CartModel.findOne({_id: cartId})
            .exec((err, cart) => {
                if(err){
                    console.log(EMSGS.CART.ERROR_PUT_CART)
                    throw EMSGS.CART.ERROR_PUT_CART
                }
                else {
                    const indexProduct = cart.products.findIndex(element => element._id === parseInt(productId))
                    const lengthOfProducts = cart.products.length;
                    if(indexProduct === -1 && cart.products.length !== 0){
                        cart.products[lengthOfProducts]._id = productId
                        cart.products[lengthOfProducts].quantity = parseInt(newQuantity)
                    }
                    else{
                        cart.products[indexProduct].quantity = parseInt(newQuantity)
                    }
                    
                    cart.save((err,updatedCart) => {
                        if(err){
                            console.log(err)
                            throw EMSGS.CART.ERROR_PUT_CART
                        }
                        else {
                            console.log("Updated cart",updatedCart)
                        }
                    })
                }
            })
            return cart;
        } catch (error) {
            console.log(error)
            throw 'Error en updateQuantityOfProducts'
            
        }
    }

     async deleteAllProducts(cartId){
        try {
            const cart = await CartModel.findOne({_id:parseInt(cartId)})
            .exec((err, cart) =>{
                if(err){
                    console.log('Error en deleteAllProducts')
                    throw EMSGS.CART.ERROR_DELETE_PRODUCTS
                }
                else{
                    cart.products = []
                    cart.save((err,saved) => {
                        if(err){
                            throw EMSGS.CART.ERROR_DELETE_PRODUCTS;
                        }
                        else{
                            console.log('Carrito actualizado', saved)
                        }
                    })
                }
            })

            return cart;
            
        } catch (error) {
            console.log ( 'Error en deleteAllProducts')
            throw EMSGS.CART.ERROR_DELETE_PRODUCTS;            
        }
     }

     async populateProductsOfACart(cartId){
        try {
            const cart = await CartModel.findOne({_id:cartId}).populate("products").then((cart) =>{
                console.log(cart)
                return cart;
            }).catch((err) =>{
                console.log('Error al hacer populate')
                throw 'Error en populateProducts'
            })
            
            
        } catch (error) {
            console.log('Error en populateProducts', error)
            throw EMSGS.CART.ERROR_GET_ALL_PRODUCTS;
        }
     }

     async createCartAndAddProduct (productId){
        try {
            console.log('Entro el producto ', productId)
            const cart = await CartModel.create({products:[{_id: productId, quantity:1}]})
            return cart
        } catch (error) {
            console.log('Error en createCartAndAddProduct', error)
            throw EMSGS.CART.ERROR_ADD_CART
        }
     }
}

export const cartService = new CartsServices()