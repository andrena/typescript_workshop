import {Equal, Expect} from '@type-challenges/utils'

type StoredType = 'Box' | 'Container' | 'Barrel' | 'Bag'

type StorageCount = {}

// Teil 1 (Teil 2 weiter unten)
// Wir hätten gerne einen Typ, der für jeden der StoredTypes die Anzahl beinhaltet (siehe Testfall unten).
// Passe dazu den Typ StorageCount an und setze dies möglicht elegant um, sodass der Typ bei einer Erweiterung
// der StoredTypes auch automatisch erweitert wird.

type cases = [
    Expect<Equal<StorageCount, {
        Box: number,
        Container: number,
        Barrel: number,
        Bag: number
    }>>
]

// Teil 2
// Schreibe nun eine generische Klasse, die für einen Übergebenen Typen einen passenden Storage Count wie oben anlegt.

type Count<T> = any

type cases2 = [
    Expect<Equal<Count<'Mehl' | 'Butter' | 'Brot'>, {
        Mehl: number,
        Butter: number,
        Brot: number
    }>>,
    Expect<Equal<Count<1 | 2 | 3>, {
        1: number,
        2: number,
        3: number
    }>>
]

// @ts-expect-error
type invalid = Count<Date | {} | 'Chicken'>