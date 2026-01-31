import { DesNote } from "@renderer/components/NameSpaces/Des/Notes/DesNote";

export class QuickFunction implements DesNote {
    type: "expression" = "expression";
    public LatexEquation: string;

    public constructor(
        public VariableName: string,
        public Expression: string,
        public id: string = VariableName,
    ) {
        this.LatexEquation = `${this.VariableName}=${this.Expression}`;
    }

    toDesNote(): Desmos.ExpressionState {
        return {
            id: this.id,
            type: this.type,
            latex: this.LatexEquation,
        };
    }
}
