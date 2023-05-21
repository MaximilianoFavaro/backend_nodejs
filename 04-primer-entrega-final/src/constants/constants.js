const contractProducts = {
    title:       'title',
    description: 'description',
    price:       0,
    thumbnail:   '/urlurl/img',
    code:        0,
    stock:       0
}

const checkContractObject = (contract, contractToCheck) => {
    
    // Verificar si tienen la misma cantidad de claves
    const keys1 = Object.keys(contract);
    const keys2 = Object.keys(contractToCheck);
    
    if (keys1.length !== keys2.length) {
        return false;
    }    
    // Verificar si todas las claves de un objeto existen en el otro objeto
    for (let key of keys1) {
        if (!keys2.includes(key)) {
        return false;
        }
    }    
    // Verificar si los tipos de datos asociados a cada clave son iguales
    for (let key of keys1) {
        if (typeof contract[key] !== typeof contractToCheck[key]) {
        return false;
        }
    }
    
    return true;
      
}

export  {contractProducts,checkContractObject}