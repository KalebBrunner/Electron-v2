// /**
//  *
//  * Helper functions for DivExpression
//  *
//  **/
// function Div(a: number, b: number): number {
//     return a / b;
// }

//  type maybeNumber = number | mathError;

// function SafeDiv(a: number, b: number): maybeNumber {
//     if (b == 0) {
//         return "Div by Zero";
//     } else {
//         return a / b;
//     }
// }

// /**
//  *
//  * Master Interface
//  *
//  **/
// interface Expression {
//     evaluate(): number;
// }

// /**
//  *
//  * Unary Expressions
//  *
//  **/
// interface UnaryExpression extends Expression {
//     evaluate(): number;
// }

// class Value implements UnaryExpression {
//     public constructor(public val: number) {}

//     public evaluate(): number {
//         return this.val;
//     }
// }

// /**
//  *
//  * Binary Expressions
//  *
//  **/
// interface BinaryExpressions extends Expression {
//     evaluate(): number;
// }

//  class Divide implements BinaryExpressions {
//     public constructor(
//         public lhs: Expression,
//         public rhs: Expression,
//     ) {}

//     public evaluate(): number {
//         return Div(this.lhs.evaluate(), this.rhs.evaluate());
//     }
// }

// type mathError = string;

// // type definition
// type Maybe<T> = (val: T) => T | null;
// // return wraped in maybe type
// function CouldFail<U>(x: U): Maybe<U> {
//     return () => x;
// }
// \\
// // function Bind(a: Maybe<A>, f: (value: Maybe<A>) => Maybe<B>):  {
// //     if

// //     return Maybe<B>3
// // }

// function loggingIdentity<Type>(arg: Type[]): Type[] {
//   console.log(arg.length);
//   return arg;
// }

// const mystring = ["hi", "hello"];

// mystring

// function getProperty<Key extends keyof Type, Type,>(obj: Type, key: Key) {
//   return obj[key];
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a");
// getProperty(x, "m");

// loggingIdentity(3)

// const myExpression = new Divide(new Value(3), new Value(0));

// const v = CouldFail(myExpression)

// function CreateMathError<T>(a: string): Maybe<T> {
//     return () => a;
// }

// // myExpression.evaluate();

// // function nothing<T>(): Maybe<T> {
// //     return () => null;
// // }

// // const NOTHING: Maybe<any> = () => null;

// // let maybeString: Maybe<string> = NOTHING;
// // console.log(maybeString);
// // maybeString = transform("hello");
// // console.log(maybeString);

// // type TaggedUnion = { val: any; tag: string };
