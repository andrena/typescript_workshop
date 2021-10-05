import {Equal, Expect} from '@type-challenges/utils'

type MockFunctionV2<T extends (...args: any) => any> = {
    (): T,
    mockReturnValue<G>(this: G, value: T): G
}

// Wir legen erneut unser MockObject an, diesmal aber als DeepMock.
// Hinweis: Wir kümmern uns nicht um spezielle Typen wie z.B. Date. Man darf davon ausgehen, dass wir nur Objekte mocken,
// die aus beliebig tief verschachtelten Primitives und Funktionen bestehen

type MockObjectV2<T> = any

// Test Cases
type LanguageV2 = 'en' | 'de'

type OriginalObjectV2 = {
    maxSize: number,
    loadPage: (page: number) => void
    getNumberOfPages: () => number
    getTitle: (language: LanguageV2) => string
    getLanguage: () => LanguageV2,
    config: {
        maxAge: number
        reload: () => void
        getAsJson: () => string,
        configCreator: {
            name: string,
            getGreeting: (polite: boolean) => string
        }
    }
}

type ExpectedMockedObjectV2 = {
    maxSize: number,
    loadPage: MockFunctionV2<(page: number) => void>
    getNumberOfPages: MockFunctionV2<() => number>
    getTitle: MockFunctionV2<(language: LanguageV2) => string>
    getLanguage: MockFunctionV2<() => LanguageV2>
    config: {
        maxAge: number
        reload: MockFunctionV2<() => void>
        getAsJson: MockFunctionV2<() => string>,
        configCreator: {
            name: string,
            getGreeting: MockFunctionV2<(polite: boolean) => string>
        }
    }
}

type cases3 = [
    Expect<Equal<MockObjectV2<OriginalObjectV2>, ExpectedMockedObjectV2>>
]