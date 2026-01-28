export class Expression {
    public constructor(
        public id: string, // e.g. "124214"
        public LatexName: string, // e.g. "P_point1"
        public x: number,
        public y: number,
    ) {}

    get valueExpression(): string {
        return `(${this.x},${this.y})`;
    }

    get latexEquation(): string {
        return `${this.LatexName}=${this.valueExpression}`;
    }

    toDesmosExpression() {
        return {
            id: this.id,
            type: "expression" as const,
            latex: this.latexEquation,
        };
    }

    setFromListValue(v: number[]) {
        if (!v || v.length < 2) return;
        this.x = v[0];
        this.y = v[1];
    }

    /** "(x,-y)" for *this* point */
    get conjugateValueExpression(): string {
        return `(${this.x},${-this.y})`;
    }

    /** "ThisLatexName = <expr>" */
    equationFrom(expr: string): string {
        return `${this.LatexName}=${expr}`;
    }

    /** "ThisLatexName = (other.x, -other.y)" */
    equationAsConjugateOf(other: Expression): string {
        return this.equationFrom(other.conjugateValueExpression);
    }
}
