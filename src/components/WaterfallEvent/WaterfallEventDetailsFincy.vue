<script setup>
import { computed } from 'vue'
import Datasource from '../../stores/datasource.js'
const store = Datasource()

import LoadingIndicator from '../LoadingIndicator.vue'
import CycleEvent from '../../models/CycleEvent';
import { marked } from 'marked';
const language = computed(() => store.language)
const strings = computed(() => store.strings)
const fincies = computed(() => store.fincies)

const fincy = computed(() => {
    let fiscalYearStart = (new Date()).getMonth() <= 2 ? (new Date()).getFullYear() - 1 : (new Date()).getFullYear();
    return fincies.value.find(f => f.document_type === props.event.fincy_document_type && f.fiscal_year_start == fiscalYearStart);
});

const fincyable = computed(() => {
    if (!fincy.value) return null;

    const fincyable = fincy.value.publication ? fincy.value.publication : fincy.value.blog;

    if (!fincyable) return null;

    let abstract;

    if (fincyable[`abstract_${language.value}`]) {
        abstract = fincyable[`abstract_${language.value}`];
    } else if (fincyable.metadata && fincyable.metadata[`abstract_${language.value}`]) {
        abstract = fincyable.metadata[`abstract_${language.value}`];
    }


    return {
        ...fincyable,
        type: fincy.value.blog ? 'blog' : fincy.value.publication.type,
        release_date: new Date(fincyable.release_date),
        abstract: abstract ? marked(abstract) : null,
        permalink: fincyable.permalinks[language.value].website
    };
});

const props = defineProps({
    event: {
        type: CycleEvent,
        required: true
    }
});

const openFincyable = (e) => {
    window.location.href = fincyable.value.permalink;
}
</script>
<template>
    <div class="h-full">
        <div v-if="fincies === null || !fincy"
            class="rounded shadow-inner bg-white h-full flex flex-row items-center justify-center">
            <LoadingIndicator v-if="fincies === null" class="size-8 text-slate-800"></LoadingIndicator>
            <span v-else class="font-thin text-lg text-center text-pretty">{{
                strings['upcoming_report_long_label']
                }}</span>
        </div>
        <figure role="link" tabindex="0" v-if="fincyable"
            class="flex flex-row gap-4  bg-white rounded shadow-inner h-full p-4 cursor-pointer" @click="openFincyable">

            <div v-if="fincyable.coverpages && fincyable.coverpages.distribution[language].small"
                class="w-16 border border-gray-300 dark:border-gray-700 shadow-sm h-fit">
                <img :src="fincyable.coverpages.distribution[language].small" alt="">
            </div>
            <div class="w-full flex flex-col gap-0.5">
                <div
                    class="flex-none max-w-max px-2 py-1 font-semibold border-l-4 bg-gray-100 border-gray-800 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-200 text-xs">
                    {{ strings[`fincyable_label_${fincyable.type}`] }}</div>

                <aside
                    class="text-sm flex flex-col flex-wrap gap-x-2 md:flex-row md:items-center justify-start text-gray-800 dark:text-gray-200">
                    {{ fincyable.release_date.toLocaleDateString(`${language}-CA`, {
                        year: "numeric", month: "long",
                        day: "numeric"
                    }) }}</aside>
                <a :href="fincyable.permalink"
                    class="leading-tight md:flex-row md:items-center justify-start text-sky-800 dark:text-sky-200 font-semibold underline">
                    {{ fincyable[`title_${language}`] }}</a>

                <div v-if="fincyable.abstract" v-html="fincyable.abstract" class="text-xs leading-tight"></div>

            </div>

        </figure>
    </div>
</template>