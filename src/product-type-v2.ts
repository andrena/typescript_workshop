type ProductV2 = {
    code: ProductCodeV2,
    type: ProductTypeV2
}

type ProductCodeV2 = any
type ProductTypeV2 = 'Book' | 'AudioBook' | 'Movie'

// Die Produktcodes setzen sich immer nach dem Schema "${Typ}-${irgendeineZahl}" zusammen.
// Stelle durch eine korrekte Typdefinition von ProductCodeV2 sicher, dass das immer der Fall ist.

declare let productV2: ProductV2

productV2.code = 'Book-1234'
// @ts-expect-error
productV2.code = 'Book-c1234'
productV2.code = 'AudioBook-3242'
productV2.code = 'Movie-35234'
// @ts-expect-error
productV2.code = 'Comic-353'
// @ts-expect-error
productV2.code = '45352'