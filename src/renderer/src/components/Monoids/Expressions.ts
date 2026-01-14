/**
 *
 * Helper functions for DivExpression
 *
 **/
function Div(a: number, b: number): number {
    return a / b;
}

export type maybeNumber = number | null;
function SafeDiv(a: number, b: number): maybeNumber {
    if (b == 0) {
        return null;
    } else {
        return a / b;
    }
}

/**
 *
 * Master Interface
 *
 **/
interface Expression {
    evaluate(): number | null;
}

/**
 *
 * Unary Expressions
 *
 **/
interface UnaryExpression extends Expression {
    evaluate(): number;
}

export class Value implements UnaryExpression {
    public constructor(public val: number) {}

    public evaluate(): number {
        return this.val;
    }
}

/**
 *
 * Binary Expressions
 *
 **/
interface BinaryExpressions extends Expression {
    evaluate(): number;
}

export class Divide implements BinaryExpressions {
    public constructor(
        public lhs: Expression,
        public rhs: Expression,
    ) {}

    public evaluate(): number {
        return Div(this.lhs.evaluate(), this.rhs.evaluate());
    }
}

const myExpression = new Divide(new Value(3), new Value(0));

myExpression.evaluate();

function nothing<T>(): Maybe<T> {
    return () => null;
}
const NOTHING: Maybe<any> = () => null;

type Maybe<T> = (val: T) => T | null;

let maybeString: Maybe<string> = NOTHING;
console.log(maybeString);
maybeString = transform("hello");
console.log(maybeString);

function transform<U>(x: U): Maybe<U> {
    return () => x;
}
