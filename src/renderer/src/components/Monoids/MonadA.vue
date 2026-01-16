<script setup lang="ts">
import { Bind2 } from "./BindRefactor";

function SafeDiv(a: number, b: number): Maybe<number> {
    if (b == 0) {
        return new ErrorMessage("div by zero");
    } else {
        return a / b;
    }
}

function add(a: number, b: number): number {
    return a + b;
}

// add(SafeDiv(3, 1), 3);

const c = Bind2(add)(Bind2(add)(SafeDiv(3, 6), 3), 5);

console.log(c);
console.log(3 / 6 + 3 + 5);
</script>

<template>
    <div>This is the monad page</div>
</template>
