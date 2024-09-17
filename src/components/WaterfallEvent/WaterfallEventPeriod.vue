<script setup>
import { computed, h, inject, Transition } from 'vue'

import CycleBar from '../CycleBar.vue';
import CycleEvent from '../../models/CycleEvent';
import WaterfallEventReportingIndicator from './WaterfallEventReportingIndicator.vue';
import Datasource from '../../stores/datasource.js'
const store = Datasource()
const language = computed(() => store.language)
const waterfallColWidth = inject('waterfallColW')

const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

const getLeftPadding = () => {
    const startDate = props.event.start;
    const percentageOfStartDateInMonth = startDate.getDate() / getDaysInMonth(startDate);
    return waterfallColWidth.value * percentageOfStartDateInMonth;
}

const getRightPadding = () => {
    const endDate = props.event.end;
    const percentageOfEndDateInMonth = endDate.getDate() / getDaysInMonth(endDate);
    return waterfallColWidth.value * (1 - percentageOfEndDateInMonth);
}

const getColStart = () => {
    const classOptions = ["col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7", "col-start-8", "col-start-9", "col-start-10", "col-start-11", "col-start-12"];
    const yOffset = props.event.start.getMonth() - 2;
    return classOptions[yOffset < 0 ? 12 + yOffset : yOffset];
}

const getMonthSpan = () => {
    if (!props.event.end) return 1;
    return props.event.end.getMonth() - props.event.start.getMonth();
}

const getColSpan = () => {
    if (!props.event.end) return "col-span-1";
    const classOptions = ["col-span-1", "col-span-2", "col-span-3", "col-span-4", "col-span-5", "col-span-6", "col-span-7", "col-span-8", "col-span-9", "col-span-10", "col-span-11", "col-span-12"];

    return classOptions[getMonthSpan()];
}

const getBarWidth = () => {
    if (!props.event.end || !waterfallColWidth.value) return undefined;

    return waterfallColWidth.value * (getMonthSpan() + 1) - getLeftPadding() - getRightPadding();

}

const props = defineProps({
    event: {
        type: CycleEvent,
    }
});

const gridClasses = computed(() => {
    return [
        "lg:pt-2",
        getColStart(),
        getColSpan()
    ];

});

const render = () => {
    return h('div', {
        class: gridClasses.value,
        style: {
            paddingLeft: `${getLeftPadding()}px`,
            paddingRight: props.event.end ? `${getRightPadding()}px` : '0px'
        }
    }, [
        h(CycleBar, {
            class: [(props.event.end ? "w-full h-4" : "size-4"), "group-hover:drop-shadow-lg", "group-hover:group-open:drop-shadow-none", "transition-shadow"],
            color: props.event.color,
            upcoming: props.event.govdocs[language.value].length,
            width: getBarWidth()
        }),
        h(WaterfallEventReportingIndicator, {
            event: props.event,
            class: "hidden lg:flex"
        }),
    ]);
};
</script>
<template>
    <render />
</template>