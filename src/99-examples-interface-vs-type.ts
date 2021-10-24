//// Basic Objects ////

type PersonType = {
    firstName: string
    lastName: string
    birthDate: Date
    parents: {
        father: PersonType
        mother: PersonType
    }
}

interface PersonInterface {
    firstName: string
    lastName: string
    birthDate: Date
    parents: {
        father: PersonType
        mother: PersonType
    }
}

//// Functions ////

type GenericFunctionType = (...args: any) => any

interface GenericFunctionInterface {
    (...args: any): any
}

//// Extension ////

type UserType = PersonType & {
    userName: string
}

type UserTypeExtendingInterface = PersonInterface & {
    userName: string
}

interface UserInterface extends PersonInterface {
    userName: string
}

interface UserInterfaceExtendingType extends PersonType {
    userName: string
}

type CallableUserType = PersonType & GenericFunctionType & {
    userName: string
}

interface CallableUserInterface extends PersonInterface, GenericFunctionInterface {
    userName: string
}

// Classes can implement Types and Interfaces equally

//// Type specifics ////
// These are not possible with interfaces and cannot be extended with Interfaces (but can with Types) and cannot be
// implemented by classes

type Name = string
type PersonOrFunction = PersonType | GenericFunctionType
type ColoredPoint3D = [number, number, number, string]

//// Interface specifics ////
// Interfaces can be defined multiple Times and will be merged. Types cannot be defined multiple times.

interface Point {
    x: number
}

interface Point {
    y: number
}

const point: Point = {x: 1, y: 2}
