<script setup>
import { computed } from 'vue'
import Datasource from '../../stores/datasource.js'
const store = Datasource()
import pboGlyph from '../../assets/pbo-glyph.svg?url'

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
        type: fincy.value.blog ? 'BLOG' : fincy.value.publication.type,
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
    <div class="p-2 bg-teal-900 rounded-sm">
        <LoadingIndicator v-if="fincies === null" class="size-8 text-white"></LoadingIndicator>
        <div v-else class="flex flex-col gap-2">
            <div class="font-semibold flex flex-row items-center gap-2">
                <img :src="pboGlyph" class="size-4" alt="" style=" filter: grayscale(1) brightness(3);">
                {{
                    fincyable ? strings[`fincyable_label_${fincyable.type}`] : strings[`fincyable_label_generic`]
                }}
            </div>

            <div class="border-l-2 border-solid border-teal-700 pl-2">
                <figure role="link" tabindex="0" v-if="fincyable" class="flex flex-row gap-2 h-full cursor-pointer"
                    @click="openFincyable">

                    <div v-if="fincyable.coverpages && fincyable.coverpages.distribution[language].small"
                        class="w-16  shadow-xs h-fit">
                        <img :src="fincyable.coverpages.distribution[language].small" alt="">
                    </div>
                    <div class="w-full flex flex-col gap-0.5 justify-center">
                        <aside
                            class="text-xs flex flex-col flex-wrap gap-x-2 md:flex-row md:items-center justify-start text-white">
                            {{ fincyable.release_date.toLocaleDateString(`${language}-CA`, {
                                year: "numeric", month: "long",
                                day: "numeric"
                            }) }}</aside>
                        <a :href="fincyable.permalink"
                            class="leading-tight md:flex-row md:items-center justify-start text-white font-semibold underline text-sm">
                            {{ fincyable[`title_${language}`] }}</a>

                        <div v-if="fincyable.abstract" v-html="fincyable.abstract"
                            class="text-xs leading-tight text-white">
                        </div>

                    </div>

                </figure>
                <div v-else class="italic">
                    {{ strings[`upcoming_report_long_label`] }}
                </div>
            </div>
        </div>

    </div>
</template>