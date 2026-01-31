// import {
//     DesmosDomain,
//     DesmosDragMode,
//     DesmosExpressionType,
//     DesmosLabelOrientation,
//     DesmosLineStyle,
//     DesmosPointStyle,
// } from "./MinorInterfaces";

// export namespace myDes {
//     export interface DesmosExpression {
//         id: string;
//         type: DesmosExpressionType;

//         latex: string;

//         // visibility / behavior
//         hidden: boolean;
//         secret: boolean;
//         readonly: boolean;
//         playing: boolean;

//         // styling
//         color: string; // hex like "#388c46"
//         lineStyle: DesmosLineStyle;
//         lineWidth: string; // "" means default
//         lineOpacity: string; // "" means default
//         fillOpacity: string; // "" means default

//         pointStyle: DesmosPointStyle;
//         pointSize: string; // stored as string in state
//         pointOpacity: string; // e.g. "0.8" or ""
//         movablePointSize: string; // stored as string, "" means default

//         // drag + domains
//         dragMode: DesmosDragMode;
//         domain: DesmosDomain;
//         polarDomain: DesmosDomain;
//         parametricDomain: DesmosDomain;

//         // 3D parametric domains (present even in 2D state)
//         parametricDomain3Du: DesmosDomain;
//         parametricDomain3Dv: DesmosDomain;
//         parametricDomain3Dr: DesmosDomain;
//         parametricDomain3Dphi: DesmosDomain;

//         // labels
//         label: string;
//         showLabel: boolean;
//         interactiveLabel: boolean;
//         labelOrientation: DesmosLabelOrientation;
//         labelSize: string; // "" means default
//     }
// }
