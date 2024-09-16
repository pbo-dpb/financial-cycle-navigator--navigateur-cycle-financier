<script setup>
import { computed, h, inject, Transition } from 'vue'
import Datasource from '../../stores/datasource.js'
const store = Datasource()
const language = computed(() => store.language)
const strings = computed(() => store.strings)

import CycleEvent from '../../models/CycleEvent';
import { ArrowTurnDownRightIcon } from '@heroicons/vue/16/solid';
const fincies = computed(() => store.fincies)

const fincy = computed(() => {
    if (!fincies.value) return false;
    let fiscalYearStart = (new Date()).getMonth() <= 2 ? (new Date()).getFullYear() - 1 : (new Date()).getFullYear();
    return fincies.value.find(f => f.document_type === props.event.fincy_document_type && f.fiscal_year_start == fiscalYearStart);
});

const props = defineProps({
    event: {
        type: CycleEvent,
    }
});


const render = () => {
    return (props.event.fincy_document_type && fincies.value) ?
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
                "pl-2",
                "text-sm",
                "tracking-tighter",
                'rounded bg-teal-600 dark:bg-teal-400 px-2 lg:rounded-none lg:bg-transparent lg:dark:bg-transparent lg:px-0',
                ...(fincy.value ? [
                    "lg:text-teal-700 lg:dark:text-teal-100 text-white"
                ] : ["lg:text-slate-500 lg:dark:text-slate-200 text-white"
                ]),

            ],
        }, [
            h(ArrowTurnDownRightIcon, { 'class': "size-4 shrink-0 hidden lg:block" }),
            fincy.value ? h('img', {
                src: fincy.value.publication.coverpages.distribution[language.value].small,
                class: "h-4 border border-slate-300 shrink-0 shadow"
            }) : null,
            h('span', {
                class: "shrink-0"
            }, fincy.value === false ? '' : fincy.value ? strings.value[`fincyable_label_${fincy.value.publication.type}`] : strings.value.upcoming_report_short_label)
        ])) : null
};
</script>
<template>
    <render />
</template>