import { Equal, Expect } from '@type-challenges/utils'

// Teil 1 (Teil 2 weiter unten)
// Wir brauchen ein Tupel für einen 2D-Punkt. Zusätzlich zu den zwei Koordinaten (jeweils number) soll darin auch
// noch die Farbe (als string) des Punktes enthalten sein.

type Point2D = [number, number, string]
type cases = [
    Expect<Equal<Point2D[0], number>>,
    Expect<Equal<Point2D[1], number>>,
    Expect<Equal<Point2D[2], string>>,
]

declare const point3d: Point2D
// @ts-expect-error
const invalid = point3d[3]

// Teil 2
// Wir wollen einen Typen Tuple<N extends number, T> anlegen, der, gegeben eine Zahl N >= 0 (davon darf ausgegangen werden),
// ein N-Tupel von Typ T anlegt (siehe Testfälle).
// Hinweis: Vielleicht hilft es hier, noch einen dritten generischen Parameter (mit Defaultwert) anzulegen

type Tuple<N extends number, TYPE, T extends TYPE[] = []> = T["length"] extends N ? T : Tuple<N, TYPE, [TYPE, ...T]>

type testCasesForTuple = [
    Expect<Equal<Tuple<4, string>, [string, string, string, string]>>,
    Expect<Equal<Tuple<2, Point2D>, [Point2D, Point2D]>>,
    Expect<Equal<Tuple<0, number>, []>>
]

// Teil 3
// Nun wollen wir das N-Tuple verwenden, um einen Typen Polygon<N extends number> zu definieren, der die aufspannenden
// Punkte sowie den automatisch passenden Namen enthält

type Polygon<N extends number> = {
    name: `${N}-sided polygon`,
    points: Tuple<N, Point2D>
}

type testCasesForPolygon = [
    Expect<Equal<Polygon<5>, {
        name: '5-sided polygon',
        points: [Point2D, Point2D, Point2D, Point2D, Point2D]
    }>>,
    Expect<Equal<Polygon<3>, {
        name: '3-sided polygon',
        points: [Point2D, Point2D, Point2D]
    }>>
]