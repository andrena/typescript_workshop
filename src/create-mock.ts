import {Equal, Expect} from '@type-challenges/utils'

type MockFunction<T extends (...args: any) => any> = {
    (): T,
    mockReturnValue<G>(this: G, value: T): G
}

// Wir haben bereits einen generischen Typ für eine Mock-Funktion.
// Nun brauchen wir noch einen Typen für ein MockObject, der, gegeben ein Object, ein Object zurückgibt,
// in dem sämtliche Funktionen durch Mocks ersetzt wurden.
// Hinweis: Wir betrachten hier nur die erste Ebene, machen also keinen Deep-Mock

type MockObject<T> = any

// Test Cases
type Language = 'en' | 'de'

type OriginalObject = {
    maxSize: number,
    loadPage: (page: number) => void
    getNumberOfPages: () => number
    getTitle: (language: Language) => string
    getLanguage: () => Language,
    createdAt: Date,
    config: {
        maxAge: number
        reload: () => void
        getAsJson: () => string
    }
}

type ExpectedMockedObject = {
    maxSize: number,
    loadPage: MockFunction<(page: number) => void>
    getNumberOfPages: MockFunction<() => number>
    getTitle: MockFunction<(language: Language) => string>
    getLanguage: MockFunction<() => Language>
    createdAt: Date,
    config: {
        maxAge: number
        reload: () => void
        getAsJson: () => string
    }
}


type cases3 = [
    Expect<Equal<MockObject<OriginalObject>, ExpectedMockedObject>>
]