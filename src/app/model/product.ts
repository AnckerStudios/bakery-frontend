import { IIngredient } from "./ingredient";

export interface IProduct{
    id: string,
    name: string,
    volume: number,
    category: string,
    ingredients: IIngredient[],
}