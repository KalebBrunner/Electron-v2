class ErrorMessage {
    public constructor(
        public SummaryMessage: string,
        public ExpectedType?: string,
    ) {}
}

type Maybe<T> = T | ErrorMessage;

function Bind<ArgumentList extends unknown[], ResultType>(
    f: (...args: ArgumentList) => ResultType,
) {
    return (
        ...m_args: { [K in keyof ArgumentList]: Maybe<ArgumentList[K]> }
    ): Maybe<ResultType> => {
        // if any argument is null => result is null
        if (m_args.some((x) => isError(x))) return new ErrorMessage("err");

        // unwrap and call f
        return f(...(m_args as ArgumentList));
    };
}

type AnyFunction<x extends unknown[], y> = (...args: x[]) => y;

function SafeDiv(a: number, b: number): Maybe<number> {
    if (b == 0) {
        return new ErrorMessage("div by zero");
    } else {
        return a / b;
    }
}

function add(a: number, b: number): number {
    return a + b;
}

// add(SafeDiv(3, 1), 3);

const c = Bind(add)(1, 2);

console.log(c);

function isError(value: any): value is ErrorMessage {
    return value instanceof ErrorMessage;
}

// function IsNumber(value: any): value is number {
//     return typeof value === "number";
// }

// const a: Maybe<number> = 3;
// const z: Maybe<number> = new ErrorMessage("err", "Maybe<Number>");
