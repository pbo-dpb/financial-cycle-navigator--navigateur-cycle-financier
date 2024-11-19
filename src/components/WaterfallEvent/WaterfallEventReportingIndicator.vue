<script setup>
import { computed, h, inject, Transition } from 'vue'
import Datasource from '../../stores/datasource.js'
const store = Datasource()
const language = computed(() => store.language)
const strings = computed(() => store.strings)

import CycleEvent from '../../models/CycleEvent';
import { ArrowTurnDownRightIcon, CheckIcon } from '@heroicons/vue/16/solid';
import WaterfallEventReportingIndicatorBadge from './WaterfallEventReportingIndicatorBadge.vue';
const fincies = computed(() => store.fincies)

const fincy = computed(() => {
    if (!fincies.value) return false;
    let fiscalYearStart = store.currentFyStartYear;
    let fincy = fincies.value.find(f => f.document_type === props.event.fincy_document_type && f.fiscal_year_start == fiscalYearStart);

    if (!fincy) return null;

    if (!fincy.publication ?? null) return false;

    return fincy;
});

const props = defineProps({
    event: {
        type: CycleEvent,
    }
});


const render = () => {
    return (fincies.value) ?
        h(Transition, {
            enterFromClass: "opacity-0 pl-8",
            enterActiveClass: "transition-all duration-1000 "

        }, () => h('div', {
            class: [
                "w-fit",
                "text-nowrap",
                "flex",
                "flex-row",
                "items-center",
                "gap-1",
                "lg:pl-2",
                "text-sm",
                "tracking-tighter",
                "lg:mt-1",
                ...(fincy.value ? [
                    "lg:text-teal-700 lg:dark:text-teal-100 text-white"
                ] : ["lg:text-slate-500 lg:dark:text-slate-200 text-white"
                ]),

            ],
        }, [
            h(ArrowTurnDownRightIcon, { 'class': "size-4 shrink-0 hidden lg:block" }),
            h(WaterfallEventReportingIndicatorBadge, {
                type: "gov",
                upcoming: props.event.govdocs[language.value].length === 0,
            }),
            props.event.fincy_document_type ? h(WaterfallEventReportingIndicatorBadge, {
                type: "pbo",
                upcoming: fincy.value ? false : true,

            }) : null
        ])) : null
};
</script>
<template>
    <render />
</template>