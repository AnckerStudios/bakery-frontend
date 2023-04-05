import { IBakery } from "./bakery";
import { ICategory } from "./category";
import { IProduct } from "./product";
import { IProductBakery } from "./productBakery";

export interface IProductCategories{
    category: ICategory,
    productBakerys: IProductBakery[]
}