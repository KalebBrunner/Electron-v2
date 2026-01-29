export class DesFunction implements DesExpression {
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
