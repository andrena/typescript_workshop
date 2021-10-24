import { Equal, Expect } from "@type-challenges/utils";
/*
 Wir wollen einen Typen für einen Worker definieren, der eine übergebene Menge an Schritten abarbeitet.
 Da die Schritte für einen Worker fix sind, wollen wir auch in der Typisierung des Workers selbst die beiden
 Felder "totalSteps" und "currentStep" sicher typisieren (als Beispiele Siehe Testcases unten).

 Dazu brauchen wir ein paar Hilfstypen.

 Aufgaben:
 1. Erstellt einen generischen Typen Length<T extends any[]>, der die Länge eines gegebenen Arrays zurückgibt
 2. Erstellt einen generischen Typen NumberRangeFromOne<N extends number>, der den Union-Type 1 | 2 | ... | N zurückgibt
    a. Erstellt dazu erst einen generischen Typen Decrement<N extends number>, der einen literal number Type annimmt
       und den um eins verringerten Literal Type zurückgibt
       Man darf davon ausgehen, dass N hier immer eine ganze Zahl >= 1 ist
    b. Erstellt den generischen Typen NumberRangeFromOne<N extends number> unter Verwendung von Decrement<N extends number>
       Man darf annehmen, dass N >= 0 ist. Bei N = 0 wird never zurückgegeben
 3. Verwendet die angelegten Typen, um nun den generischen Typen MyWorker<STEPS extends WorkingStep[]> anzupassen.
 4. Wir wollen noch einen PartialWorker implementieren, der nur auf einem (zusammenhängenden) Teilbereich der Schritte
    arbeitet (also z.B. nur auf den Schritten 3-5).
    a. Erstellt dazu den Generischen Typen NumberRange<START, END>, der einen Zahlenbereich von START (exkl.) bis
       END (inkl.) zurückgibt.
       Man darf davon ausgehen, dass 0 <= START und 0 <= END
       Tipp: Dazu könnt ihr einen der vorher definierten Hilfstypen verwenden.
    b. Implementiert jetzt den generischen Typen PartialWorker<STEPS, START, END>.
       Man darf (zunächst) davon ausgehen, dass 0 <= START <= END <= Length<STEPS> ist
       Übergibt man kein END, kann er von START bis zum letzten Schritt arbeiten.
       Übergibt man darüberhinaus auch kein START, so kann er auf jedem Schritt arbeiten.
    c. Nun wollen wir die Bedingung 0 <= START <= END <= Length<STEPS> doch noch durch das Typsystem erzwingen.
       Passt die Definition von PartialWorker an, um die Testfälle zu erfüllen.

 Hinweise:
 - Rekursive Typen in TypeScript haben eine maximale Rekursionstiefe. Wir gehen davon aus, dass wir mit der
   Grenze zurecht kommen und keinen MyWorker anlegen, der 100 Steps beinhaltet.
 - Gegebenenfalls müsst ihr die generischen Hilfstypen noch durch weitere generische Parameter erweitern.
   Achtet dann darauf, diesen weiteren Parametern einen Defaultwert zuzuweisen, damit man sie nicht immer explizit
   setzen muss.
*/
type WorkingStep = string

///////// 1. Length /////////
type Length<A extends any[]> = A['length']

type testCasesForLength = [
    Expect<Equal<Length<[]>, 0>>,
    Expect<Equal<Length<[any, any]>, 2>>,
    Expect<Equal<Length<[number, string, number, any, any, string]>, 6>>,
]

///////// 2.a Decrement /////////
type Decrement<N extends number, T extends any[] = []> = [any, ...T] extends { length: N } ? (T extends { length: infer M } ? M : never) : Decrement<N, [any, ...T]>

type testCasesForDecrement = [
    Expect<Equal<Decrement<1>, 0>>,
    Expect<Equal<Decrement<2>, 1>>,
    Expect<Equal<Decrement<10>, 9>>,
    Expect<Equal<Decrement<17>, 16>>,
]

///////// 2.b NumberRangeFromOne /////////
type NumberRangeFromOne<N extends number> = N extends 0 ? never : NumberRangeFromOne<Decrement<N>> | N

type testCasesForRangeFromOne = [
    Expect<Equal<NumberRangeFromOne<0>, never>>,
    Expect<Equal<NumberRangeFromOne<1>, 1>>,
    Expect<Equal<NumberRangeFromOne<2>, 1 | 2>>,
    Expect<Equal<NumberRangeFromOne<3>, 1 | 2 | 3>>,
    Expect<Equal<NumberRangeFromOne<10>, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>>,
]

///////// 3. Worker /////////

// MyWorker soll angepasst werden
type MyWorker<STEPS extends WorkingStep[]> = STEPS["length"] extends 0 ? {
    totalSteps: 0
    currentStep: never
} : {
    totalSteps: Length<STEPS>,
    currentStep: NumberRangeFromOne<Length<STEPS>>
}


declare const processingWorker: MyWorker<['init', 'read', 'process', 'validate', 'save', 'clean']>
declare const computeWorker: MyWorker<['compute', 'output']>
declare const emptyWorker: MyWorker<[]>
type testCasesForWorker = [
    Expect<Equal<typeof emptyWorker.totalSteps, 0>>,
    Expect<Equal<typeof emptyWorker.currentStep, never>>,
    Expect<Equal<typeof processingWorker.totalSteps, 6>>,
    Expect<Equal<typeof processingWorker.currentStep, 1 | 2 | 3 | 4 | 5 | 6>>,
    Expect<Equal<typeof computeWorker.totalSteps, 2>>,
    Expect<Equal<typeof computeWorker.currentStep, 1 | 2>>,
]

///////// 4.a NumberRange /////////
type NumberRange<M extends number, N extends number> = Exclude<NumberRangeFromOne<N>, NumberRangeFromOne<M>>

type testCasesForNumberRange = [
    Expect<Equal<NumberRange<0, 0>, never>>,
    Expect<Equal<NumberRange<2, 5>, 3|4|5>>,
    Expect<Equal<NumberRange<5, 2>, never>>,
    Expect<Equal<NumberRange<0, 1>, 1>>,
    Expect<Equal<NumberRange<0, 5>, 1 | 2 | 3 | 4 | 5>>,
    Expect<Equal<NumberRange<7, 10>, 8 | 9 | 10>>,
]

///////// 4.b PartialWorker /////////
type PartialWorker<STEPS extends WorkingStep[],
    START extends NumberRangeFromOne<END> | 0 = 0,
    END extends NumberRangeFromOne<Length<STEPS>> | Length<STEPS> = Length<STEPS>> = STEPS["length"] extends 0 ? {
    totalSteps: 0,
    currentStep: never
} : {
    totalSteps: Length<STEPS>,
    currentStep: NumberRange<START, END>
}

declare const partialProcessingWorker: PartialWorker<['init', 'read', 'process', 'validate', 'save', 'clean'], 2, 4>
declare const partialNoEndProcessingWorker: PartialWorker<['init', 'read', 'process', 'validate', 'save', 'clean'], 2>
declare const partialWholeProcessingWorker: PartialWorker<['init', 'read', 'process', 'validate', 'save', 'clean']>
declare const partialComputeWorker: PartialWorker<['compute', 'output'], 0, 1>
declare const partialEmptyWorker: PartialWorker<[]>

type testCasesForPartialWorker = [
    Expect<Equal<typeof partialEmptyWorker.totalSteps, 0>>,
    Expect<Equal<typeof partialEmptyWorker.currentStep, never>>,
    Expect<Equal<typeof partialProcessingWorker.totalSteps, 6>>,
    Expect<Equal<typeof partialProcessingWorker.currentStep, 3 | 4>>,
    Expect<Equal<typeof partialNoEndProcessingWorker.totalSteps, 6>>,
    Expect<Equal<typeof partialNoEndProcessingWorker.currentStep, 3 | 4 | 5 | 6>>,
    Expect<Equal<typeof partialWholeProcessingWorker.totalSteps, 6>>,
    Expect<Equal<typeof partialWholeProcessingWorker.currentStep, 1 | 2 | 3 | 4 | 5 | 6>>,
    Expect<Equal<typeof partialComputeWorker.totalSteps, 2>>,
    Expect<Equal<typeof partialComputeWorker.currentStep, 1>>,
]


///////// 4.c PartialWorker (advanced) /////////

// @ts-expect-error
declare const invalidStartIndexWorker: PartialWorker<['step1', 'step2', 'step3'], -1, 2>
// @ts-expect-error
declare const invalidEndIndexWorker: PartialWorker<['step1', 'step2', 'step3'], 0, 4>
// @ts-expect-error
declare const invalidCombinedIndexWorker: PartialWorker<['step1', 'step2', 'step3'], 2, 1>
