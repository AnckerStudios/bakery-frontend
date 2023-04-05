import { IBakery } from "./bakery";
import { IIngredient } from "./ingredient";
import { IProduct } from "./product";

export interface IProductBakery{
    bakery:IBakery,
    product:IProduct,
    price:number
}