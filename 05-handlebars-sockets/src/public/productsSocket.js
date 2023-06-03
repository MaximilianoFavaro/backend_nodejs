const socketProducts = io()  

socketProducts.on("realtimeproducts", async(data) => {
    let htmlContent = `<h3>Se encontraron :</h3>`

    data.forEach(element => {
        htmlContent += `
        <div>
            <p>Id: ${element.id}</p>
            <p>Titulo: ${element.title}</p>
            <p>Descripcion: ${element.description}</p>
            <p>Codigo: ${element.code}</p>
            <p>Precio: ${element.price}</p>
            <p>Estado: ${element.status}</p>
            <p>Stock: ${element.stock}</p>
            <p> ${element.precio}</p>
            <p>Id ${element.cateogry}</p>
            <p>Id ${element.thumbnail}</p>
        </div>
        `
        
    });
    const productContainer = document.getElementById("containerProducts")
    productContainer.innerHTML = htmlContent;  

});
    


