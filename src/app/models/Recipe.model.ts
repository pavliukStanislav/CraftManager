export interface Recipe{
    name: string,
    cost: number,
    ingredients: Array<Ingredient>
    userId: string
}

export interface Ingredient{
    name: string,
    count: number
}