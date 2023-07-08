import { Schema } from "mongoose";

export const CONTRACT_PRODUCTS = {    
    title:       'title',
    description: 'description',
    code:        0,
    price:       0,
    status:      true,
    stock:       0,
    category:    'categoria',
    thumbnail:   []   
    
}

export const checkContractObject = (contract, contractToCheck) => {
    
    // Verificar si tienen la misma cantidad de claves
    const keys1 = Object.keys(contract);
    const keys2 = Object.keys(contractToCheck);
    
    if (keys1.length !== keys2.length) {
        console.log('sale por1')
        return false;
        
    }    
    // Verificar si todas las claves de un objeto existen en el otro objeto
    for (let key of keys1) {
        if (!keys2.includes(key)) {
            console.log('sale por2')
        return false;
        }
    }    
    // Verificar si los tipos de datos asociados a cada clave son iguales
    for (let key of keys1) {
        if (typeof contract[key] !== typeof contractToCheck[key]) {
            console.log('sale por3')
        return false;
        }
    }
    // Verificar Datos
    const valores = Object.values(contractToCheck);
    const todosTienenValor = valores.every(valor => valor !== null && valor !== undefined && valor !== '');    
    if (!todosTienenValor) {
        console.log('sale por4')
          return false;
    }
    
    return true;
      
}

/**
 * Objeto para la definicion de campos al momento de crear un Schema de mongo
 * @typedef {Object} FIELD_DEFINITION
 */
const FIELD_DEFINITION =Object.freeze( {
    TYPE_STRING_REQUIRED:    { type: String,   required: true},
    TYPE_STRING_NOREQUIRED:  { type: String,   required: false},
    TYPE_NUMBER_REQUIRED:    { type: Number,   required: true},
    TYPE_NUMBER_NOREQUIRED:  { type: Number,   required: false},
    TYPE_BOOLEAN_REQUIRED:   { type: Boolean,  required: true},
    TYPE_BOOLEAN_NOREQUIRED: { type: Boolean,  required: false},
    TYPE_ARRAY_STRING_REQ:   { type: [String], required: false},
    TYPE_ARRAY_OBJECT_REQ:   { type: [Object], required: true },
    TYPE_AUTO_UNIQUE:        { type: Schema.Types.ObjectId, auto:true},
    TYPE_PRODUCT_REFERENCE:  { type: Schema.Types.ObjectId, ref:'Products'}
})

export const SCHEMA = Object.freeze({
    PRODUCTS: {
        _id:         FIELD_DEFINITION.TYPE_AUTO_UNIQUE,
        title:       FIELD_DEFINITION.TYPE_STRING_REQUIRED,
        description: FIELD_DEFINITION.TYPE_STRING_REQUIRED,
        code:        FIELD_DEFINITION.TYPE_NUMBER_REQUIRED,
        price:       FIELD_DEFINITION.TYPE_NUMBER_REQUIRED,
        status:      FIELD_DEFINITION.TYPE_BOOLEAN_REQUIRED,
        stock:       FIELD_DEFINITION.TYPE_NUMBER_REQUIRED,
        category:    FIELD_DEFINITION.TYPE_STRING_REQUIRED,
        thumbnail:   FIELD_DEFINITION.TYPE_ARRAY_STRING_REQ 
    },
    CART: {
        _id:      FIELD_DEFINITION.TYPE_AUTO_UNIQUE,
        products: [
            {
                _id:FIELD_DEFINITION.TYPE_PRODUCT_REFERENCE,
                quantity: FIELD_DEFINITION.TYPE_NUMBER_REQUIRED
            }
        ]     
             
    }
})

/**
 * Constante de mensajes para manejo de errores
 * EMSGS : ERROR_MESSAGES
 */
export const EMSGS = Object.freeze({
    PRODUCT: Object.freeze({ 
        CONTRACT_CHECK:     "El producto no posee todos los campos requeridos",
        THROW_MESSAGE:      "VALIDATION ERROR",
        PRODUCT_NOT_FOUND:  "No se encontro el producto solicitado",
        ERROR_GET_BY_ID:    "Error al buscar el producto solicitado",
        INVALID_ID:         "El id del producto es invalido",
        UNABLE_TO_CONNECT:  "Error al conectar a la base",
        ERROR_GET_PAG_PROD: "Error al obtejer la paginacion de productos",        
        ERROR:              "error",
        ADDEDPRODUCT:       "Error al agregar el producto",
        DELETEDPRODUCT:     "Error al eliminar un producto",
        UPDATEDPRODUCT:     "Error al actualizar el producto",
        CODE: 500

    }),
    CART: Object.freeze({
        ERROR_GET_ALL: "Error al obtener todos los carritos",
        ERROR_ADD_CART: "Error al añadir un carrito",
        ERROR_PUT_CART: "Error al modificar un carrito",
        ERROR_DELETE_PRODUCTS: "Error al borrar los productos",
        ERROR_GET_ALL_PRODUCTS:"Error al obtener todos los productos de un carrito",
        ERROR_CODE: 500
    })
})
/**
 * Funciones que retornan un objeto para el output de los endpoint al momento de un error
 * EMSGSF : ERROR_MESSAGES_FUNCTIONS
 */
export const EMSGSF = Object.freeze({
    PRODUCT: Object.freeze({
        ADDEDPRODUCT:   (outputData) => { return { status: EMSGS.PRODUCT.ERROR, message:EMSGS.PRODUCT.ADDEDPRODUCT,   data:outputData }},
        DELETEDPRODUCT: (outputData) => { return { status: EMSGS.PRODUCT.ERROR, message:EMSGS.PRODUCT.DELETEDPRODUCT, data:outputData }},
        UPDATEDPRODUCT: (outputData) => { return { status: EMSGS.PRODUCT.ERROR, message:EMSGS.PRODUCT.UPDATEDPRODUCT, data:outputData }}
    }),
    CART: Object.freeze({
        DELETEDPRODUCT: (outputData) => { return { status: EMSGS.PRODUCT.ERROR, message:EMSGS.PRODUCT.UPDATEDPRODUCT, data:outputData }},
        
    })
})

/**
 * Constante de mensajes para respuestas exitosas
 * SMSGS: SUCCESS_MESSAGES
 */
export const SMSGS = Object.freeze({
    PRODUCT: Object.freeze({
        CODE: 200,
        SUCCESS: "success",
        ADDEDPRODUCT:   "Producto agregado con exito",
        DELETEDPRODUCT: "Producto eliminado con exito",
        UPDATEDPRODUCT: "Producto actualizado con exito"
    }),
    CART: Object.freeze({
        SUCCESS_CODE: 200,
        SUCCESS_MSG: "success",
        SUCCESS_ADDEDCART:   "Carrito agregado con exito",
        SUCCESS_DELETEDCART: "Carrito eliminado con exito",
        SUCCESS_UPDATEDCART: "Carrito actualizado con exito"
    })
})

/**
 * Funciones que retornan un objeto al momento de success en un endpoint
 * SMSGS : SUCCESS_MESSAGES_FUNCTIONS
 */
export const SMSGSF = Object.freeze({
    PRODUCT: Object.freeze({
        ADDEDPRODUCT:  (outputData) =>{ return { status: SMSGS.PRODUCT.SUCCESS, message: SMSGS.PRODUCT.ADDEDPRODUCT,   data:outputData }},
        DELETEDPRODUCT:(outputData) =>{ return { status: SMSGS.PRODUCT.SUCCESS, message: SMSGS.PRODUCT.DELETEDPRODUCT, data:outputData }},
        UPDATEDPRODUCT:(outputData) =>{ return { status: SMSGS.PRODUCT.SUCCESS, message: SMSGS.PRODUCT.UPDATEDPRODUCT, data:outputData }}

    })
})