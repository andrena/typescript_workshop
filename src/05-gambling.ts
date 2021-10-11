/*
Teil 1:
  Definiere den Typen für eine Münze. Diese kann entweder den String "Head" oder den String "Tails" haben.
 */

type Coin = 'Head' | 'Tails'

let coin: Coin
coin = 'Head'
coin = 'Tails'
// @ts-expect-error
coin = ''
// @ts-expect-error
coin = 'Edge'

/*
Teil 2
  Definiere den Typen für einen Würfel. Dieser kann jede Augenzahl beinhalten.
 */

type Die = 1 | 2 | 3 | 4 | 5 | 6

let die: Die
die = 1
die = 2
die = 3
die = 4
die = 5
die = 6
// @ts-expect-error
die = 0
// @ts-expect-error
die = 7
// @ts-expect-error
die = ''

/*
Teil 3
  Wir haben den Typen SpecialDie, der die Werte 1, 3, 5, 6, 8 und 10 haben kann.
  Definiere den Typen "PossiblePairsWithNormalAndSpecial" für die Paschs, die man erhalten kann, wenn man den
  normalen Die und den SpecialDie zusammen wirft.
 */

type SpecialDie = 1 | 3 | 5 | 6 | 8 | 10
type PossiblePairsWithNormalAndSpecial = SpecialDie & Die

let specialDie: SpecialDie
let possiblePairs: PossiblePairsWithNormalAndSpecial
specialDie = 1
specialDie = 3
specialDie = 5
specialDie = 6
specialDie = 8
specialDie = 10
// @ts-expect-error
specialDie = 2
// @ts-expect-error
specialDie = 4

possiblePairs = 1
possiblePairs = 3
possiblePairs = 5
possiblePairs = 6
// @ts-expect-error
possiblePairs = 2
// @ts-expect-error
possiblePairs = 4
// @ts-expect-error
possiblePairs = 8
// @ts-expect-error
possiblePairs = 10

/*
Teil 4
  Der Typ PossiblePairsWithNormalAndSpecial von oben ist uns etwas zu speziell. Schreibe daher einen generischen
  Typen PossiblePairs<S, T>, der zwei beliebige Würfel bekommt (ihr müsst T und S nicht einschränken) und die
  möglichen Paare zurückgibt.
 */

type PossiblePairs<S, T> = S & T

let possiblePairs2: PossiblePairs<Die, SpecialDie>
possiblePairs2 = 1
possiblePairs2 = 3
possiblePairs2 = 5
possiblePairs2 = 6
// @ts-expect-error
possiblePairs2 = 2
// @ts-expect-error
possiblePairs2 = 4
// @ts-expect-error
possiblePairs2 = 8
// @ts-expect-error
possiblePairs2 = 10

/*
Teil 5
  Gegeben sind die Typen für Spielkartenfarbe und Wert (jeweils als String). Schreibt nun einen Typen für eine
  Spielkarte, der Strings der Form "Wert of Color" annehmen kann.
  Bonus: Passt ihn so an, dass statt "Three of Club" der String "Three of Clubs" lauten muss (dazu die originalen
  Testfälle aus- und die für den Bonus einkommentieren).
 */

type CardColor = 'Spade' | 'Club' | 'Heart' | 'Diamond'
type CardValue =
    'Ace'
    | 'Two'
    | 'Three'
    | 'Four'
    | 'Five'
    | 'Six'
    | 'Seven'
    | 'Eight'
    | 'Nine'
    | 'Ten'
    | 'Jack'
    | 'Queen'
    | 'King'

type Card = `${CardValue} of ${CardColor}`

let card: Card
card = "Five of Club"
card = "Six of Diamond"
card = "Ace of Spade"
card = "King of Heart"
// @ts-expect-error
card = "King of Hearts"
// @ts-expect-error
card = "King of Herz"
// @ts-expect-error
card = "Three of Diamond and Jewelry"
// @ts-expect-error
card = "One of Diamond"
// @ts-expect-error
card = "One Diamond"

// Bonus
// card = "Five of Clubs"
// card = "Six of Diamonds"
// card = "Ace of Spades"
// card = "King of Hearts"
// // @ts-expect-error
// card = "King of Heart"
// // @ts-expect-error
// card = "King of Herz"
// // @ts-expect-error
// card = "Three of Diamond and Jewelry"
// // @ts-expect-error
// card = "One of Diamond"
// // @ts-expect-error
// card = "One Diamond"