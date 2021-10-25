import {Equal, Expect} from '@type-challenges/utils'

type ProductV3 = {
    code: ProductCodeV3,
    type: ProductTypeV3
}

type ProductCodeV3 = `${ProductTypeV3}-${number}`
type ProductTypeV3 = 'Book' | 'AudioBook' | 'Movie'

// Teil 1 (Teil 2 weiter unten):
// Da man aus dem ProductCode den Produkttyp bestimmen kann, möchten wir das auch in der Typisierung können.
// Schreibe einen generischen Typ, der, gegeben einen ProductCode, daraus den zugehörigen ProductType bestimmt

type ExtractCode<T extends ProductCodeV3> = any

type cases = [
    Expect<Equal<ExtractCode<'Book-325'>, 'Book'>>,
    Expect<Equal<ExtractCode<'Movie-53445'>, 'Movie'>>,
    Expect<Equal<ExtractCode<'AudioBook-23123'>, 'AudioBook'>>,
]

// Teil 2: Passe die Signatur dieser Methode so an, dass sie TypeFromCode verwendet.
// Hinweis: Dazu muss die Methode auch generisch werden

declare const extractType: (code: any) => any

const book = extractType('Book-3234')
const movie = extractType('Movie-892')
const audioBook = extractType('AudioBook-5')
// @ts-expect-error
const other = extractType('Other-53')

type cases2 = [
    Expect<Equal<typeof book, 'Book'>>,
    Expect<Equal<typeof movie, 'Movie'>>,
    Expect<Equal<typeof audioBook, 'AudioBook'>>
]