export class DesPoint implements DesExpression {
    // public Expression: string;
    // public LatexEquation: string;

    public constructor(
        public VariableName: string,
        public x: number,
        public y: number,
        public id: string = VariableName,
    ) {}

    get Expression(): string {
        return `(${this.x},${this.y})`;
    }
    get LatexEquation(): string {
        return `${this.VariableName}=${this.Expression}`;
    }

    get toDesNote(): DesExpression {
        return {
            id: this.id,
            type: "expression",
            latex: this.LatexEquation,
        };
    }

    setFromArray(pair: number[]) {
        if (!pair || pair.length < 2) {
            return console.log("Point.setFromPair failed");
        }
        this.x = pair[0];
        this.y = pair[1];
    }
}

class DesFunction implements DesExpression {
    public LatexEquation: string;

    public constructor(
        public VariableName: string,
        public Expression: string,
        public id: string = VariableName,
    ) {
        this.LatexEquation = `${this.VariableName}=${this.Expression}`;
    }

    get toDesNote(): DesExpression {
        return {
            id: this.id,
            type: "expression",
            latex: this.LatexEquation,
        };
    }
}
