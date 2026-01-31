export interface DesNote {
    // constructor(type: string, id: string);
    type: "expression" | "text" | "table";
    id: string;

    toDesNote(): Desmos.ExpressionState;
}
