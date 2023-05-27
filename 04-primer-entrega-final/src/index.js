import express from 'express';
import {router} from './routes/routes.js'

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',router);
app.use('*', async(req,res)=>{
    res.status(404).json({
        status:"error",
        message:"La ruta es invalida",
        data: {}
    })
})
app.listen('8080',console.log('Escuchando puerto 8080'));


