export type DesPointStyleObj = {
    pointOpacity?: number | string;
    pointStyle?: keyof typeof Desmos.Styles;
    pointSize?: number | string;
    movablePointSize: number | string;
    color?: string;
    hidden?: boolean;
    secret?: boolean;
};

export class PointStyling {
    pointOpacity: number | string = 0.8;
    pointStyle: keyof typeof Desmos.Styles = "POINT";
    pointSize: number | string = 8;
    movablePointSize: number | string = 8;
    color: string | undefined;
    hidden: boolean = false;
    secret: boolean = false;

    public constructor(style?: DesPointStyleObj) {
        if (style) {
            this.pointOpacity = style.pointOpacity ?? this.pointOpacity;
            this.pointStyle = style.pointStyle ?? this.pointStyle;
            this.pointSize = style.pointSize ?? this.pointSize;
            this.movablePointSize =
                style.movablePointSize ?? this.movablePointSize;
            this.color = style.color ?? this.color;
            this.hidden = style.hidden ?? this.hidden;
            this.secret = style.secret ?? this.secret;
        }
    }
}
