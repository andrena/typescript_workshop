import {Equal, Expect} from '@type-challenges/utils'

type Point2D = [number, number, string]

// Teil 1 (Teil 2 weiter unten)
// Wir brauchen ein Tupel für einen 2D-Punkt. Zusätzlich zu den drei Koordinaten soll darin auch noch die Farbe
// des Punktes enthalten sein.

type cases = [
    Expect<Equal<Point2D[0], number>>,
    Expect<Equal<Point2D[1], number>>,
    Expect<Equal<Point2D[2], string>>,
]

declare const point3d: Point2D
// @ts-expect-error
const invalid = point3d[3]

// Teil 2
// Wir wollen einen generischen Shape-Typ definieren. Dieser enthält, je nachdem, ob es ein Dreieck, Viereckt oder Fünfeck ist,
// die entsprechende Anzahl an 2D-Punkten sowie den Typen selbst.

type Shape<T extends 'triangle' | 'quadrangle' | 'pentagon'> = {
    type: T,
    points: T extends 'triangle'
        ? [Point2D, Point2D, Point2D]
        : T extends 'quadrangle'
            ? [Point2D, Point2D, Point2D, Point2D]
            : T extends 'pentagon'
                ? [Point2D, Point2D, Point2D, Point2D, Point2D]
                : never
}

type cases2 = [
    Expect<Equal<Shape<'triangle'>, {
        type: 'triangle',
        points: [Point2D, Point2D, Point2D]
    }>>,
    Expect<Equal<Shape<'triangle'>, {
        type: 'triangle',
        points: [Point2D, Point2D, Point2D]
    }>>,
    Expect<Equal<Shape<'triangle'>, {
        type: 'triangle',
        points: [Point2D, Point2D, Point2D]
    }>>
]

// @ts-expect-error
type invalidShape = Shape<'hexagon'>
