import { EMSGS, EMSGSF, SMSGS,SMSGSF } from "../../constants/constants.js";
import { cartService } from "../../services/cart.services.js";



export const deleteProductFromCart = async(req,res) => {
    try {
        const {cid, pid} = req.params
        const deletedProduct = await cartService.deleteProductFromCart(cid,pid)
        return res.status(200).json({status:"success", message: "Se elimino el producto solicitado", data:deletedProduct}) ;
    } catch (error) {
        return res.status(500).json(EMSGSF.CART.DELETEDPRODUCT(null))
    }

}

export const emptyTheCart = async (req,res) => {
    try {
        const {cid} =  req.params
        const emptyCart = await cartService.deleteAllProducts(cid)
        return res.status(200).json({status:"success", message: "Carrito vaciado con exito", data:emptyCart})
    } catch (error) {
        res.status(500).json({status:"error", message: "No se pudo vaciar el carrito", data:error})
    }

}
export const addProductsToCart = async(req,res) =>{
    try {
        const {cid} = req.params
        const {products} = req.body
        const addedProducts = await cartService.addProductsToCart(cid,products)

        return res.status(200).json({status:"success", message: "Productos agregados con exito", data:addedProducts})
    } catch (error) {
        return res.status(500).json({status:"error", message: "No se pudo agregar los productos", data:null})
    }

}

export const createCartAndAddAProduct = async(req,res) => {
    try {
        const {pid} = req.params
        const newCart =await cartService.createCartAndAddProduct(pid)
        return res.status(200).json({status:"success", message: "Carrito creado con exito", data:newCart});
    } catch (error) {
        console.log('Error en el controlador')
        return res.status(500).json({status:"error", message: "No se pudo crear el carrito", data:error})
    }

}

export const updateQuantityOfProductsInCart = async(req,res) => {
    try {
        const {cid,pid} = req.params
        const {quantity} = req.body
        const updatedCart = await cartService.updateQuantityOfProducts(cid,pid,quantity)
        return res.status(200).json({status:"success", message: "Carrito actualizado con exito", data:updatedCart});
    } catch (error) {
        return res.status(500).json({status:"error", message: "No se pudo actualizar el carrito", data:error})
    }
}

export const getPopulatedCart = async(req,res) => {
    try {
        const {cid} = req.params
        console.log('por llamar a populateProductsOfACart')
        const populatedCart = await cartService.populateProductsOfACart(cid)
        console.log(populatedCart.products)
        return res.status(200).render("populatedcart",{products:populatedCart.products})
    } catch (error) {
        console.log('Error en render')
        return res.status(500).render("populatedcart",{products:null})
    }

}