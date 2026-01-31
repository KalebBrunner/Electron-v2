export {};
declare global {
    export namespace Desmos {
        interface GraphSettings {
            degreeMode?: boolean;
            showGrid?: boolean;
            polarMode?: boolean;
            showXAxis?: boolean;
            showYAxis?: boolean;
            xAxisNumbers?: boolean;
            yAxisNumbers?: boolean;
            polarNumbers?: boolean;
            xAxisStep?: number;
            yAxisStep?: number;
            xAxisMinorSubdivisions?: number;
            yAxisMinorSubdivisions?: number;
            xAxisArrowMode?: keyof typeof AxisArrowModes;
            yAxisArrowMode?: keyof typeof AxisArrowModes;
            xAxisLabel?: string;
            yAxisLabel?: string;
            randomSeed?: string;
        }
    }
}
