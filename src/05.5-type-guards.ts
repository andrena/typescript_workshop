type Continent = {
    name: string
    iso: string
}

type Country = {
    name: string
    normalizedName: string
    isoCode: string
}

type Language = {
    name: string
    nativeName: string
    isoCode: string
}

type GeographicalEntity = Continent | Country | Language

/*
 Wir haben die drei Typen Continent, Country und Language, welche als GeographicalEntity zusammengefasst sind.
 Nun würden wir gerne die Methode getDisplayName implementieren, welche eine Instanz dieser Typen übergeben bekommt
 und für Continent den "name", für Country den "normalizedName" und für Language den "nativeName" zurückgibt.

 Implementiere diese Methode unter Zuhilfenahme von TypeGuards (isContinent, isCountry, isLanguage).

 Hinweis: Es darf davon ausgegangen werden, dass immer sämtliche Felder, die ein Typ haben kann, auch befüllt sind.
 */


function getDisplayName(value: GeographicalEntity): string {
    return ''
}