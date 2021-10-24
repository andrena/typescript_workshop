// never

type Ingredient = 'Sugar' | 'Flour' | 'Eggs' | 'Milk'
function exampleForNever(ingredient: Ingredient) {
    switch (ingredient) {
        case "Sugar":
            return ingredient
        case "Flour":
            return ingredient
        case "Eggs":
        case "Milk":
            return ingredient
        default:
            return ingredient
    }
}

let resolvingPromise = new Promise<string>((resolve) => {
    resolve('hi')
})

let neverResolvingPromise = new Promise<never>((resolve) => {
})

function allwaysThrowError(): never {
    throw new Error('Error')
}

function neverReturn(): never {
    while(true) {}
}

// Any vs Unknown
let anyVar: any
let unknownVar: unknown

anyVar = 10
unknownVar = 10

let stringVar: string
stringVar = anyVar
// @ts-expect-errors
stringVar = unknownVar

anyVar.doSomething()
// @ts-expect-errors
unknownVar.doSomething()
