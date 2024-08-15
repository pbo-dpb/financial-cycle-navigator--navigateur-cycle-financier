<script setup>
import { computed, h, inject } from 'vue'
import { commonProps, getBaseGridClasses, getLeftPadding } from "./EventBar"
import CycleDot from '../CycleDot.vue'
const props = defineProps(commonProps);
const waterfallColWidth = inject('waterfallColW')

const gridClasses = computed(() => {
    return [
        ...getBaseGridClasses(),
    ];

});

const render = () => {
    return h('div', {
        class: gridClasses.value,
        style: {
            paddingLeft: `${getLeftPadding(props.event.start, waterfallColWidth.value)}px`,
        }
    }, [
        h(CycleDot, {
            class: "size-4",
            color: props.event.color,
        })
    ]);
};
</script>
<template>
    <render />
</template>