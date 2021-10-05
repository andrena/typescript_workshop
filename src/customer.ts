type Person = {
    firstName: string
    lastName: string
}

type Customer = {
    id: string
}

declare const checkStatus: (customer: Customer) => 'approved' | 'pending'
declare const generateGreeting: (person: Person) => string

// Passe den Typen des Parameters dieser Funktion so an, dass sämtliche Relevanten informationen vorliegen und
// weiter unten kein Type-Fehler auftritt

function checkCustomer(customer: any) {
    if (checkStatus(customer) === 'approved') {
        return generateGreeting(customer)
    }
    return 'You are not yet approved. Please contact your supervisor.'
}

// @ts-expect-error
checkCustomer({
    id: '12'
})
// @ts-expect-error
checkCustomer({
    firstName: 'Gerd',
    lastName: 'Müller'
})
checkCustomer({
    id: '12',
    firstName: 'Gerd',
    lastName: 'Müller'
})