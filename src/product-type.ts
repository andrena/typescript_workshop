// Wir haben genau drei verschiedene Arten an Produkten in unserem Sortiment: Books, AudioBooks und Movies
// Der Typ ist im Produkt als String hinterlegt. Sorge durch eine Anpassung des Typen dafür, dass wir nichts
// falsches zuweisen

type Product = {
    code: string,
    type: string
}

declare let product: Product

product.type = 'Book'
product.type = 'AudioBook'
product.type = 'Movie'
// @ts-expect-error
product.type = 'Comic'