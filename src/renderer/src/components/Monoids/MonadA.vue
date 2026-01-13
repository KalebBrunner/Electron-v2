<script setup lang="ts">
import { abs } from "mathjs";

console.log("This is not a monad");

function isMathError(number: number): boolean {
    if (abs(number) == Infinity || Number.isNaN(number)) {
        return true;
    } else return false;
}

type maybeNumber = number | null;

// class maybeMonad {
//     constructor(maybeNum: )
// }

function divide(a: number, b: number): maybeNumber {
    const c = a / b;
    if (isMathError(c)) {
        console.log(c);
        return null;
    } else {
        return c;
    }
}

console.log(divide(0, 0));

class box {
    x: number;

    constructor(
        x: number,
        public y: number = 0,
    ) {
        this.x = x;
    }
}

const mybox = new box(1, 2);
</script>

<template>
    <div>This is the monad page</div>
    <div>{{ mybox }}</div>
</template>
