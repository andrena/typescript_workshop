// Literal

import { Equal, Expect } from "@type-challenges/utils"

/*
Teil 1:
  Wir wollen einen Typen definieren, der ausschließlich den String 'Hello World' beschreibt und keine anderen Werte
  zulässt.
 */

type HelloWorld = 'Hello World'

type casesForHelloWorld = [
    Expect<Equal<HelloWorld, 'Hello World'>>
]

let helloWorld: HelloWorld
helloWorld = 'Hello World'
// @ts-expect-error
helloWorld = 45
// @ts-expect-error
helloWorld = '45'

/*
Teil 2:
  Wir wollen einen Typen definieren, der ausschließlich String zulässt, die mit 'Hello' beginnen. Nach dem 'Hello'
  dürfen beliebige weitere Zeichen folgen.
 */

type HelloSomething = `Hello${string}`

let helloSomething: HelloSomething
helloSomething = 'Hello World'
helloSomething = 'Hellooooooo'
helloSomething = 'Hello my dear sister'
helloSomething = 'Hello'
// @ts-expect-error
helloSomething = 'Hi John'
// @ts-expect-error
helloSomething = 'Hell'
// @ts-expect-error
helloSomething = ' Hello World'
// @ts-expect-error
helloSomething = 100

/*
Teil 3:
  Wir haben bereits einen Typen für die verschiedenen Namen unserer Kunden. Nun wollen wir einen Typen definieren,
  der ausschließlich Begrüßungen für unsere Kunden zulässt.
 */

type Customer = 'Jaqueline' | 'Jeremy' | 'Chantal' | 'Kevin'

type HelloCustomer = `Hello ${Customer}`

let helloCustomer: HelloCustomer
helloCustomer = 'Hello Chantal'
helloCustomer = 'Hello Jaqueline'
helloCustomer = 'Hello Jeremy'
helloCustomer = 'Hello Kevin'
// @ts-expect-error
helloCustomer = 'Hello'
// @ts-expect-error
helloCustomer = 'Hello Frederik'
// @ts-expect-error
helloCustomer = ''
// ###################################


/////////////////////////////////////////////////////////////////

