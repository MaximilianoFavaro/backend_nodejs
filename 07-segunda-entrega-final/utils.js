import path from 'path'
import { fileURLToPath } from "url";
import { connect } from 'mongoose';
import { EMSGS } from './src/constants/constants.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export async function connectMongo(){
    try{
        await connect('mongodb+srv://ecommerceBase:ecommerceBase@ecommerce-base.vqstzik.mongodb.net/')
          console.log('Conected to mongo')
    }catch(error)
    {
        console.log(EMSGS.UNABLE_TO_CONNECT)
        throw EMSGS.UNABLE_TO_CONNECT;

    }
}