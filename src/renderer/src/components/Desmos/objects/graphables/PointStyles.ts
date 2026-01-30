export class PointStyling {
    public constructor(
        public pointOpacity?: number | string,
        public pointStyle?: keyof typeof Desmos.Styles,
        public pointSize?: number | string,
        public color?: string,
        public hidden?: boolean,
        public secret?: boolean,
    ) {}

    static new(params?: PointStyleArgs): PointStyling {
        return new PointStyling(
            params?.pointOpacity ?? 1,
            params?.pointStyle,
            params?.pointSize ?? 0.8,
            params?.color,
            params?.hidden,
            params?.secret,
        );
    }
}

type PointStyleArgs = {
    pointOpacity?: number | string;
    pointStyle?: keyof typeof Desmos.Styles;
    pointSize?: number | string;
    color?: string;
    hidden?: boolean;
    secret?: boolean;
};
