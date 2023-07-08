import { Schema,model } from "mongoose";
import { SCHEMA } from "../../constants/constants.js";


export const CartModel = model(
    "Carts",
    new Schema(SCHEMA.CART)
)
