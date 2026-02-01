export type Note = TextNote | TableNote | FunctionNote;

export class TextNote {
    constructor(public Content: string) {}
}

export class TableNote {
    constructor(
        public Xlist: number[],
        public Ylist: number[],
    ) {}
}

export class FunctionNote {
    constructor(
        public Name: string,
        public Expression: string,
    ) {}
}

export interface GraphSettings {
    Gridlines?: boolean;
    DegreeMode?: boolean;
}

export class Graph {
    public Gridlines: boolean;
    public DegreeMode: boolean;
    constructor(public settings: GraphSettings) {
        this.Gridlines = settings.Gridlines ?? true;
        this.DegreeMode = settings.DegreeMode ?? true;
    }
}

export class Notepad {
    readonly List: Note[] = [];
    constructor(notes?: Note | Note[]) {
        if (notes != undefined) this.push(notes);
    }

    push(input: Note | Note[]): void {
        const items = Array.isArray(input) ? input : [input];
        this.List.push(...items);
    }

    length(): number {
        return this.List.length;
    }

    list() {
        this.List.forEach((note, index) => {
            console.log(`\nNote #${index + 1} is a ${note.constructor.name}`);
        });
    }
}
