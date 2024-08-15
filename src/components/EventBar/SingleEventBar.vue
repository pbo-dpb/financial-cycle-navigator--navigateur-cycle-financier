<script setup>
import { computed, h, inject } from 'vue'
import { props, getBaseGridClasses } from "./EventBar"
defineProps(props);
const waterfallColWidth = 9//inject('waterfallColW')

const gridClasses = computed(() => {

    let classes = [...getBaseGridClasses()];

    return classes;

});

const render = () => {
    return h('div', {
        class: gridClasses.value
    }, "hello " + waterfallColWidth.value);
};
</script>
<template>
    <render />
</template>