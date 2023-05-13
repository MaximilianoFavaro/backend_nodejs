const fs = require('fs')
const constants = require('../constants/constants.js')
class ProductManager{
   
    constructor(fileName){
        this.fileName = fileName;
    }

    addProduct = async(product)=> {
        try
        {
            const aKeys= Object.keys(constants.contractProducts).sort();
            const bKeys= Object.keys(product).sort();
            if(JSON.stringify(aKeys)===JSON.stringify(bKeys))
            {
                if(fs.existsSync(this.nameFile)){
                    const products = this.getAll();
                    const lastIdAdded = products.reduce((acc,item)=> item.id > acc ? acc =item.id : acc,0);
                    const newProduct = {
                        id: lastIdAdded+1,
                        ...product
                    }
                    products.push(newProduct);
                    await fs.promises.writeFile(this.fileName, JSON.stringify(products,null,2))
                    return products;
                }
                else
                {
                    const newProduct ={
                        id:1,
                        ...product
                    }
                    await fs.promises.writeFile(this.fileName, JSON.stringify([newProduct],null,2))
    
                }
            }
            else{
                console.log('El producto no cumple la estructura minima requerida')
            }
            

        }catch(error){
            console.log('Error en addProduct')
            console.log(error)
        }
    }
    //Fin addProduct
    getById = async(id)=>{
        try{
            if(fs.existsSync(this.fileName)){
                const products = await this.getAll()
                const product  = products.find(item => item.id ===id);
                return product;
            }
        }catch(error){
            console.log('Error en getById')
            console.log(error)
        }
    }
    // Fin getById
    getAll = async()=>{
        try{
            const fileContent = await fs.promises.readFile(this.fileName,"utf8");
            const products = JSON.parse(fileContent);
            return products;
        }
        catch(error){            
            console.log('Error en getAll')
            console.log(error)
            return -1;
        }
    }
    //Fin getAll  
    deleteById = async(id)=>{
        try{
            const products = await this.getAll();
            const newProducts = products.filter(item => item.id !== id);
            await fs.promises.writeFile(this.fileName,JSON.stringify(newProducts,null,2));

        }
        catch(error){
            console.log('Error en deleteById')
            console.log(error)
        }

    }
    //Fin deleteById
    deleteAll = async()=>{
        try{
            await fs.promises.writeFile(this.fileName,JSON.stringify([]))
        } catch(error){
            console.log('Error en deleteAll')
            console.log(error)
        }
    }
    //Fin deleteAll
    updateById = async (id,body)=>{
        try{
            const aKeys= Object.keys(constants.contractProducts).sort();
            const bKeys= Object.keys(product).sort();
            if(JSON.stringify(aKeys)===JSON.stringify(bKeys))
            {
                const products = await this.getAll();
                const productPosition = products.findIndex(elm => elm.id ===id)
                products[productPosition] = {
                    id:id,
                    ...body
                }
                await fs.promises.writeFile(this.fileName,JSON.stringify(products,null,2));
                return products;
            }
        }catch(error){
            console.log('Error en updateById')
            console.log(error)
        }
    }

}

module.exports=ProductManager;