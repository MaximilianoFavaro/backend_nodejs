import express from 'express';
import {router} from './src/routes/routes.js'
import { __dirname,connectMongo } from './utils.js';
import handlebars from 'express-handlebars'
import path from 'path'
import {Server} from 'socket.io'
import { productService } from './src/services/products.services.js';

const app = express();

const viewsDirectory = path.join(__dirname,'/src/views');
const publicDirectory = path.join(__dirname,"/public")

await connectMongo();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars",handlebars.engine());
app.set("views", viewsDirectory)
app.set("view engine","handlebars")

app.use(express.static(publicDirectory))

app.use('/',router);
app.use('*', async(req,res)=>{
    res.status(404).json({
        status:"error",
        message:"La ruta es invalida",
        data: {}
    })
})
const httpServer = app.listen('8080',() =>{
    console.log('Escuchando puerto 8080 ')
});

const socketServer = new Server(httpServer)

socketServer.on("connection",async(socket) =>{
    
    socketServer.emit("realtimeproducts",await productService.getAllProducts())
    socket.on("newProduct", async(data) =>{
        console.log('Objeto al llegar',data)
       const dataSaved = await productService.createProduct(data)
       console.log(data)
       socketServer.emit("realtimeproducts",dataSaved);
    })
})
