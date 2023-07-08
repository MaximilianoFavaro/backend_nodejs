import { EMSGS,SMSGS,EMSGSF,SMSGSF } from "../../constants/constants.js";
import { ProductModel } from "../../DAO/models/products.model.js";
import { productService } from "../../services/products.services.js";

export const getPaginatedProducts = async (req,res) => {
    const {limit,page,query,sort} = req.query
    try{
        const {products,productsData}= await productService.getPaginatedProducts(limit,page,query,sort)
        
        let  links = []
        for ( let i = 1; i < products.totalPages +1 ; i++){
            links.push({label:i, href: 'http://localhost:8080/api/products/?page='+i})
        }
        
        const outputDataSuccess = {
            status:      SMSGS.PRODUCT.SUCCESS,//success/error
            payload:     productsData, //Resultado de los productos solicitados
            totalPages:  products.paginCounter,//Total de páginas
            prevPage:    products.prevPage,//Página anterior
            nextPage:    products.nextPage,//Página siguiente
            page:        products.page,//Página actual
            hasPrevPage: products.hasPrevPage,//Indicador para saber si la página previa existe
            hasNextPage: products.hasNextPage,//Indicador para saber si la página siguiente existe.
            prevLink:    products.hasPrevPage ? links[products.page].href: null,//Link directo a la página previa (null si hasPrevPage=false)
            nextLink:    products.hasNextPage ? links[products.page].href: null//Link directo a la página siguiente (null si hasNextPage=false)
        }
        return  res.status(SMSGS.PRODUCT.CODE).render('products', outputDataSuccess);    
    }
    catch(error)
    {
        const outputDataError =
            {
                status:      EMSGS.PRODUCT.ERROR,//success/error
                payload:     null, //Resultado de los productos solicitados
                totalPages:  null,//Total de páginas
                prevPage:    null,//Página anterior
                nextPage:    null,//Página siguiente
                page:        null,//Página actual
                hasPrevPage: null,//Indicador para saber si la página previa existe
                hasNextPage: null,//Indicador para saber si la página siguiente existe.
                prevLink:    null,//Link directo a la página previa (null si hasPrevPage=false)
                nextLink:    null//Link directo a la página siguiente (null si hasNextPage=false)
            }
        return res.status(EMSGS.PRODUCT.CODE).render('products', outputDataError);
    }    
}

export const getProductById = async(req,res) => {
    const {id} =req.params;
    const outputProduct = await productService.getById(id)

    return res.status(SMSGS.PRODUCT.CODE).render('detailed.product',outputProduct)
}

export const addProduct = async ( req,res) => {
    const body = req.body
    try {
        const addedProduct = await productService.createProduct(body)
        return res.status(SMSGS.PRODUCT.CODE).json(SMSGSF.PRODUCT.ADDEDPRODUCT(addedProduct))
    } catch (error) {
        return res.status(EMSGS.PRODUCT.CODE).json(EMSGSF.PRODUCT.ADDEDPRODUCT(null))
    }
}
export const deleteByIdProduct = async ( req, res) => {
    const {id} = req.params
    try {
        const deletedProduct = await productService.deleteByIdProduct(id)
        return res.status(SMSGS.PRODUCT.CODE).json(SMSGS.PRODUCT.DELETEDPRODUCT(deletedProduct))
        
    } catch (error) {        
        return res.status(EMSGS.PRODUCT.CODE).json(EMSGSF.PRODUCT.DELETEDPRODUCT(null))
    }
}
export const updateByIdProduct = async(req,res) => {
    const {id} = req.params
    const {body}=req

    try {
        const updatedProduct = await productService.updateProduct({_id: id, product:body})
        return res.status(SMSGS.PRODUCT.CODE).json(SMSGSF.PRODUCT.UPDATEDPRODUCT(updatedProduct))
        
    } catch (error) {
        return res.status(EMSGS.PRODUCT.CODE).json(EMSGSF.PRODUCT.UPDATEDPRODUCT(null))
    }
}
export const renderHome = async (req,res) => {
    try {
        const allProducts = await productService.getAllProducts();
        console.log("Por mostrar todos los productos")
        console.log(allProducts)
        res.render("home", {productos: allProducts})
    } catch (error) {
        res.render("home",{productos: null});
    }
}
export const realTimeProducts = (req,res) => {
    res.render("realTimeProducts", {})
}