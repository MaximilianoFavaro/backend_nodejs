const fs = require('fs')

class ProductManager{
    constructor(fileName){
        this.fileName = fileName;
    }

    addProduct = async(product)=> {
        try
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
            const fileContent = await fs.promises.readFile(this.nameFile,"utf8");
            const products = JSON.parse(fileContent);
            return products;
        }
        catch(error){
            console.log('Error en getAll')
            console.log(error)
        }
    }
}