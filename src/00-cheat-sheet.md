# TypeScript Types Cheat Sheet

## Basic Types

- `number`
- `string`
- `boolean`

Also there are
- `any`
- `undefined`
- `null`
- `unknown`
- `never`

... and some more.

## Basic Objects

```typescript
type MyObject = {
    property: string
    optionalProperty?: number
    deepProperty: {
        nested1: boolean
        nested2: string
    }
}
```

## Union and Intersection Types

```typescript
type PointX = {
    x: number
}
type PointY = {
    y: number
}

type Point = PointX & PointY
type PointXOrY = PointX | PointY
```

### Type Guards

```typescript
function isPointX(point: Point): point is PointX {
    return (point as PointX).x !== undefined
}
```

## Literal Types

```typescript
type CompanyName = 'andrena' | 'andrena objects' | 'andrena objects ag'
```

### Template Literal Types

```typescript
type CompanyTrademark = `© ${CompanyName} 2021`
// = '© andrena 2021' | '© andrena objects 2021' | '© andrena objects ag 2021'
```

## Tuples

```typescript
type Point3D = [number, number, number]
```

## Indexed Type

```typescript
type Countries = {
    [isoCode: string]: Country
}
```

## Utility Types

Example:
```typescript
type PartialPoint = Partial<Point>
// = { x?: number, y?: number}
```

For a full list see [here](https://www.typescriptlang.org/docs/handbook/utility-types.html).

## keyof, typeof

```typescript
type Coordinate = keyof Point
// = 'x' | 'y'

const point: Point = {x: 2, y: 7}
```

```typescript
const person = {
    name: 'Hans',
    age: 3
}

type Person = typeof person;
// = {name: string, age: number}
```

## Generic Types

```typescript
type WrapperType<T> = {
    value: T
}
```

### Default Generic Types

```typescript
type GenericPoint<T = number> = {
    x: T
    y: T
}
```
`const point: GenericPoint` is the same as `const point GenericPoint<number>`
but `const point GenericPoint<string>` is still possible.

### Generic constraints

```typescript
type Hello<T extends string> = `Hello ${T}`
```

### Conditional Generic Types

```typescript
type ToString<T extends number | string> = T extends string ? T : `${T}`
```

### Mapped Types

```typescript
type AnimalMovement = {
    swim?: () => void
    fly?: () => void
    walk?: () => void
}

type AbilityFlags<T> = {
    [k in keyof T]: boolean
}
```

`AbilityFlags<AnimalMovement>` is equal to the type `{ swim: boolean, fly: boolean, walk: boolean }`

#### Modifying the Mapped key with as

```typescript
type Getter<T> = {
    [k in keyof T as `get${Capitalize<k>}`]: () => T[k]
}
```

`type GetPointCoordinate = Getter<Point>` is equal to the type `{ getX: () => number, getY: () => number }`

```typescript
type Animal = AnimalMovement & {
    eat?: () => void
    name: string
    maxAge: number
    camouflage?: () => void
}
```

Here `AbilityFlags<AnimalMovement>` would also include `name` and `maxAge` in the flags. This can be fixed by

```typescript
type ActualAbilityFlags<T> = {
    [k in keyof T as T[k] extends (...args: any) => any ? k : never]: boolean
}
```

### Inferred Types

```typescript
type TypeOfPoint<T extends GenericPoint<any>> = T extends GenericPoint<infer S> ? S : never
```

### Recursive Generic Types

```typescript
type DeepTypeOfFirstElement<T extends any[]> = T extends [infer HEAD, ...infer TAIL]
    ? HEAD extends any[]
        ? DeepTypeOfFirstElement<HEAD>
        : HEAD
    : unknown
```