interface Sensor {
    listValue: number[];
    numericValue: number;
    observe(
        eventName: "numericValue" | "listValue" | string,
        callback: () => void,
    ): void;
}
