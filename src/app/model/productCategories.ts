import { IBakery } from "./bakery";
import { ICategory } from "./category";
import { IProduct } from "./product";

export interface IProductCategories{
    bakery: IBakery,
    category: ICategory,
    products: IProduct[]
}