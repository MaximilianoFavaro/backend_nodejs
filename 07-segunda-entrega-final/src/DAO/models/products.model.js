import {Schema, model} from "mongoose"
import { SCHEMA } from "../../constants/constants.js"

export const ProductModel = model(
    "Products",
    new Schema(SCHEMA.PRODUCTS)
)
