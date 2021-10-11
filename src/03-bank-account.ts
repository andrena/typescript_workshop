// BankAccount ist entweder ein Object mit einer ID und einer disabled-Flag oder (wenn der Kunde noch keine
// Bankverbindung angegeben hat) false (siehe Testfälle unten)
// Definiere den Typen korrekt, sodass unten in den Test Cases keine Typ-Fehler mehr vorkommen

type BankAccount = { id: string, disabled: boolean } | false

type ShopUser = {
    name: string
    bankAccount: BankAccount
}

function canOrder(person: ShopUser) {
    if (person.bankAccount === false) {
        return false
    }
    return !person.bankAccount.disabled
}

canOrder({name: 'Hans Meier', bankAccount: false})
canOrder({name: 'Hans Meier', bankAccount: {id: '33234', disabled: false}})
canOrder({name: 'Hans Meier', bankAccount: {id: '33234', disabled: true}})
// @ts-expect-error
canOrder({name: 'Hans Meier', bankAccount: true})