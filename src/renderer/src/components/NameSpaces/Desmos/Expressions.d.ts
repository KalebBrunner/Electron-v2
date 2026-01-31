export {};
declare global {
    export namespace Desmos {
        type ExpressionState =
            | {
                  type?: "text";
                  text?: string;
                  id?: string;
              }
            | {
                  type?: "expression";
                  latex?: string;
                  color?: string;
                  lineStyle?: keyof typeof Styles;
                  lineWidth?: number | string;
                  lineOpacity?: number | string;
                  pointStyle?: keyof typeof Styles;
                  pointSize?: number | string;
                  pointOpacity?: number | string;
                  fillOpacity?: number | string;
                  points?: boolean;
                  lines?: boolean;
                  fill?: boolean;
                  hidden?: boolean;
                  secret?: boolean;
                  sliderBounds?: {
                      min: number | string;
                      max: number | string;
                      step: number | string;
                  };
                  parametricDomain?: {
                      min: number | string;
                      max: number | string;
                  };
                  polarDomain?: {
                      min: number | string;
                      max: number | string;
                  };
                  id?: string;
                  dragMode?: keyof typeof DragModes;
                  label?: string;
                  showLabel?: boolean;
                  labelSize?: keyof typeof LabelSizes;
                  labelOrientation?: keyof typeof LabelOrientations;
              }
            | {
                  type: "table";
                  columns: ReadonlyArray<{
                      latex: string;
                      values?: string[];
                      color?: string;
                      hidden?: boolean;
                      points?: boolean;
                      lines?: boolean;
                      lineStyle?: keyof typeof Styles;
                      lineWidth?: number | string;
                      lineOpacity?: number | string;
                      pointStyle?: keyof typeof Styles;
                      pointSize?: number | string;
                      pointOpacity?: number | string;
                      dragMode?: keyof typeof DragModes;
                  }>;
                  id?: string;
              };
    }
}
