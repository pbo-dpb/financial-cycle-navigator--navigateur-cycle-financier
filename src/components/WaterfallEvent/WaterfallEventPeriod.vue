<script setup>
import { computed, h, inject, Transition } from 'vue'
import Datasource from '../../stores/datasource.js'
const store = Datasource()
const language = computed(() => store.language)
const strings = computed(() => store.strings)

import CycleBar from '../CycleBar.vue';
import CycleEvent from '../../models/CycleEvent';
import { ArrowTurnDownRightIcon } from '@heroicons/vue/16/solid';
const fincies = computed(() => store.fincies)

const fincy = computed(() => {
    if (!fincies.value) return false;
    let fiscalYearStart = (new Date()).getMonth() <= 2 ? (new Date()).getFullYear() - 1 : (new Date()).getFullYear();
    return fincies.value.find(f => f.document_type === props.event.fincy_document_type && f.fiscal_year_start == fiscalYearStart);
});

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
        "pt-6",
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
            width: getBarWidth()
        }),
        (props.event.fincy_document_type && fincies.value) ?
            h(Transition, {
                enterFromClass: "opacity-0 pl-8",
                enterActiveClass: "transition-all duration-1000 "

            }, () => h('div', {
                class: [
                    "w-fit",
                    "text-nowrap",
                    "text-ssm",
                    "flex",
                    "flex-row",
                    "items-center",
                    "gap-1",
                    "pl-2",
                    "text-sm",
                    "tracking-tighter",
                    ...(fincy.value ? [
                        "text-teal-700"
                    ] : ["text-slate-500"
                    ]),
                ],
            }, [
                h(ArrowTurnDownRightIcon, { 'class': "size-4 shrink-0" }),
                fincy.value ? h('img', {
                    src: fincy.value.publication.coverpages.distribution[language.value].small,
                    class: "h-4 border border-slate-300 shrink-0 shadow"
                }) : null,
                h('span', {
                    class: "shrink-0"
                }, fincy.value === false ? '' : fincy.value ? strings.value[`fincyable_label_${fincy.value.publication.type}`] : strings.value.upcoming_report_short_label)
            ])) : null
    ]);
};
</script>
<template>
    <render />
</template>