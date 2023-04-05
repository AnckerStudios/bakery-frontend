import { ICategory } from "./category";
import { IIngredient } from "./ingredient";

export interface IProduct{
    id: string,
    name: string,
    volume: number,
    category: ICategory,
    ingredients: IIngredient[],
}