import { IProduct } from "../model/product";
import { INGREDIENTS } from "./ingredients";

export const products: IProduct[] = [
    {
        id: "1",
        name: 'Пончик',
        volume: 1,
        //category: "string",
        ingredients: INGREDIENTS.filter(item => item.id !== '1'),
    },
    {
        id: "2",
        name: 'Не пончик',
        volume: 1,
        //category: "string",
        ingredients: [],
    },
    {
        id: "3",
        name: 'Донат',
        volume: 1,
        //category: "string",
        ingredients: [],
    },
    {
        id: "4",
        name: 'Булка с дыркой',
        volume: 1,
        //category: "string",
        ingredients: [],
    }
]