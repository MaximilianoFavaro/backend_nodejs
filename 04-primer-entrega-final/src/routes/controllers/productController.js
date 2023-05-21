import {FileManager} from '../../fileManager/fileManager.js'
import {contractProducts,checkContractObject} from '../../constants/constants.js'
const products = new FileManager('./src/dataFile/Products.json')


const getProducts = async(req,res) => {
    const {id} = req.params
    const {limit} = req.query
    let outputData
    if (id){
         outputData = await products.getById(id)        
    }
    else{
        const getAll = await products.getAll();
        outputData = limit != 0 ? getAll.slice(0,parseInt(limit)) : getAll        
    }
    const sizeOfData = Array.isArray(outputData) ? outputData.length : (Object.keys(outputData).length !== 0 ? 1 : 0)
    let outputCode = 0;
    let msgResponse='';
    sizeOfData !== 0 ? 
         (()=>{msgResponse={status: "success", message:`La operacion fue exitosa. Encontrados ${sizeOfData}`,data:outputData};outputCode=200} )() : 
         (()=>{msgResponse={status: "success", message:`La operacion fue exitosa. Encontrados ${sizeOfData}`,data:outputData};outputCode=400} )();
    res.status(outputCode).json(msgResponse);
}
const addProduct = async (req,res) =>{
    const body = req.body;
    let statusContract = checkContractObject(contractProducts,body)
    let msgResponse = '';
    let outputCode =0;
    const outputData = await products.save(body)
    resAdd.length !== 0 && statusContract ? 
        (()=>{msgResponse={status: "success", message:`La operacion fue exitosa.  `,data:outputData};outputCode=200} )() : 
        (()=>{msgResponse={status: "success", message:`No se pudo cargar el producto`,data:outputData};outputCode=400} )();
    res.status(outputCode).json(msgResponse);
}


export {getProducts,addProduct}

