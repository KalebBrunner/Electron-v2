<script setup lang="ts">
import { Divide, Value } from "./Expressions";

const expr1 = new Divide(new Value(12), new Value(3));

const myExpression = new Divide(new Value(3), new Value(1));

myExpression.evaluate();
</script>

<template>
    <div>This is the monad page</div>
    <div>{{ myExpression.evaluate() }}</div>
</template>
