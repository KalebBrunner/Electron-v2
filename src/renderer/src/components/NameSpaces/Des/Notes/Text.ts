import { DesNote } from "./DesNote";

export class DesText implements DesNote {
    constructor(
        public type: "text",
        public id: string,
        public text?: string,
    ) {}

    toDesNote() {
        return {
            type: this.type,
            text: this.text,
            id: this.id,
        } as Desmos.ExpressionState;
    }
}
