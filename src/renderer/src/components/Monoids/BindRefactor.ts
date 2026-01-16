function isError(value: any): value is ErrorMessage {
    return value instanceof ErrorMessage;
}

class ErrorMessage {
    public constructor(
        public SummaryMessage: string,
        public ExpectedType?: string,
    ) {}
}
type Maybe<T> = T | ErrorMessage;

type ArgList = readonly unknown[];

type AnyFunction<X extends ArgList, Y> = (...args: X) => Y;

type MaybedFunction<X extends ArgList, Y> = (...args: MapMaybe<X>) => Maybe<Y>;

type MapMaybe<X extends ArgList> = {
    [K in keyof X]: Maybe<X[K]>;
};

function Bind<X extends ArgList, Y>(
    fn: AnyFunction<X, Y>,
): MaybedFunction<X, Y> {
    return (...x: MapMaybe<X>): Maybe<Y> => {
        if (x.some(isError)) {
            return new ErrorMessage("err");
        } else {
            return fn(...(x as X));
        }
    };
}

function Bind1<X extends ArgList, Y>(
    fn: AnyFunction<X, Y>,
): MaybedFunction<X, Y> {
    return (...x: MapMaybe<X>): Maybe<Y> => {
        return x.some(isError) === true
            ? new ErrorMessage("err")
            : fn(...(x as X));
    };
}

export function Bind2<Xn extends ArgList, Y>(
    fn: AnyFunction<Xn, Y>,
): MaybedFunction<Xn, Y> {
    function fnBound(...x: MapMaybe<Xn>): Maybe<Y> {
        if (x.some(isError) === true) return new ErrorMessage("err");
        else return fn(...(x as Xn));
    }

    return fnBound;
}
