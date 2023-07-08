import { ProductModel } from "../DAO/models/products.model.js";
import { CONTRACT_PRODUCTS,checkContractObject,EMSGS } from "../constants/constants.js";

class ProductsServices {

    validateProduct(product){
        if(!checkContractObject(CONTRACT_PRODUCTS,product)){
            console.log(EMSGS.PRODUCT.CONTRACT_CHECK)
            throw EMSGS.PRODUCT.THROW_MESSAGE;
        }

    }
    validateId(id){
        if((id ?? 'undefined' !== 'undefined') && (typeof id !== 'number')){
            throw EMSGS.PRODUCT.INVALID_ID
        }
    }
    async getAllProducts(){
        const products = await ProductModel.find({});
        return products;
    }
    async getPaginatedProducts(limit, page,query, order){
        try{
            const searchLimit = limit ?? 10;
            const searchPage  = page  ?? 1;
            const searchQuery = query ?? {};            
            let searchCriteria
            if (!order) {
                const searchOrder = order === 'ASC' ? {precio : 1}: {precio:-1}
                searchCriteria = {page: searchPage, limit: searchLimit, sort: searchOrder}
            }
            else {
                searchCriteria = {page: searchPage, limit: searchLimit}
            }
            const products = await ProductModel.paginate(searchQuery,searchCriteria)        
            const productsData = products.docs.map( (prod) => {
                return {
                    id:          prod._id.toString(),
                    title:       prod.title,
                    description: prod.description,
                    code:        prod.code,
                    price:       prod.price,
                    status:      prod.status,
                    stock:       prod.stock,
                    category:    prod.category,
                    thumbnail:   prod.thumbnail
                }
            })        
            return {products, productsData}
        }
        catch(error){
            throw EMSGS.PRODUCT.ERROR_GET_PAG_PROD;
        }
        
    }

    async getById (id){
        try{
            const product = await ProductModel.findOne({_id: parseInt(id)})
            if (!product){
                throw EMSGS.PRODUCT.PRODUCT_NOT_FOUND
            }
            return product;

        }catch(error){
            throw EMSGS.PRODUCT.ERROR_GET_BY_ID
        }        
    }
    async createProduct (product){
        this.validateProduct(product)
        const newProduct = await ProductModel.create(product)
        return newProduct;
    }
    async updateProduct (product){
        this.validateProduct(product)
        const {_id, ...bodyProduct} = product
        const updatedProduct = await ProductModel.updateOne({_id: _id}, bodyProduct)
        return updatedProduct;
    }
    async deleteProductById ( id){
        this.validateId(id)
        const deletedProduct = await ProductModel.deleteOne({_id:id})
        return deletedProduct;
    }

}

export const productService = new ProductsServices()