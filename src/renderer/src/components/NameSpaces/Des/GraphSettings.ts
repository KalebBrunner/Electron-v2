export class GraphSettings {
    public constructor(
        public degreeMode?: boolean,
        public showGrid?: boolean,
        public polarMode?: boolean,
        public showXAxis?: boolean,
        public showYAxis?: boolean,
        public xAxisNumbers?: boolean,
        public yAxisNumbers?: boolean,
        public polarNumbers?: boolean,
        public xAxisStep?: number,
        public yAxisStep?: number,
        public xAxisMinorSubdivisions?: number,
        public yAxisMinorSubdivisions?: number,
        public xAxisArrowMode?: keyof typeof Desmos.AxisArrowModes,
        public yAxisArrowMode?: keyof typeof Desmos.AxisArrowModes,
        public xAxisLabel?: string,
        public yAxisLabel?: string,
        public randomSeed?: string,
    ) {
        this.degreeMode = degreeMode ?? true;
    }

    toDesmos() {
        return {
            degreeMode: this.degreeMode,
            showGrid: this.showGrid,
            polarMode: this.polarMode,
            showXAxis: this.showXAxis,
            showYAxis: this.showYAxis,
            xAxisNumbers: this.xAxisNumbers,
            yAxisNumbers: this.yAxisNumbers,
            polarNumbers: this.polarNumbers,
            xAxisStep: this.xAxisStep,
            yAxisStep: this.yAxisStep,
            xAxisMinorSubdivisions: this.xAxisMinorSubdivisions,
            yAxisMinorSubdivisions: this.yAxisMinorSubdivisions,
            xAxisArrowMode: this.xAxisArrowMode,
            yAxisArrowMode: this.yAxisArrowMode,
            xAxisLabel: this.xAxisLabel,
            yAxisLabel: this.yAxisLabel,
            randomSeed: this.randomSeed,
        } as Desmos.GraphSettings;
    }
}
