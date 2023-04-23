import { IBakery } from "./bakery";
import { ICategory } from "./category";
import { IProduct } from "./product";
import { IProductBakery } from "./productBakery";

export interface IProductPrice{
    product: IProduct,
    price?: number,
    inBakery: boolean
}