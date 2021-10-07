// Literal

import { Equal, Expect } from "@type-challenges/utils"

type HelloWorld = any

type cases = [
    Expect<Equal<HelloWorld, 'Hello World'>>
]

let helloWorld: HelloWorld

// @ts-expect-error
helloWorld = 45

// ###################################


/////////////////////////////////////////////////////////////////

