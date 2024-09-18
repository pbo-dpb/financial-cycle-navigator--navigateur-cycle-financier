<script setup>
import govLogo from "../../assets/govlogo.svg?url";
import govGlyph from '../../assets/gov-glyph.svg?url'

import { computed } from 'vue'
import Datasource from '../../stores/datasource.js'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
const store = Datasource()

import CycleEvent from '../../models/CycleEvent';
const language = computed(() => store.language)
const strings = computed(() => store.strings)



const govdocs = computed(() => {
    return props.event.govdocs[language.value];
});

const props = defineProps({
    event: {
        type: CycleEvent,
        required: true
    }
});



</script>
<template>
    <div v-for="govdoc in govdocs" class="p-2 bg-teal-900 rounded flex flex-col gap-2">
        <div class="font-semibold flex flex-row items-center gap-2">
            <img :src="govGlyph" class="size-4" alt="" style=" filter: grayscale(1) brightness(3);">{{
                strings.government_document_label
            }}
        </div>

        <div class="border-l-2 border-teal-700 pl-2">
            <a :href="govdoc" target="_blank" role="link" tabindex="0"
                class="flex flex-row gap-2 h-full cursor-pointer items-center" @click="openGovdoc(govdoc)">

                <div class="w-16  shadow-sm h-20 flex bg-gradient-to-br from-teal-600 to-teal-800 p-2">
                    <img :src="govLogo" alt="" class="place-center">
                </div>

                <div
                    class="leading-tight md:flex-row md:items-center justify-start text-white font-semibold underline text-sm">
                    {{ event[`name_${language}`] }} <ArrowTopRightOnSquareIcon class="size-4 inline-block">
                    </ArrowTopRightOnSquareIcon>
                </div>

            </a>

        </div>

    </div>
</template>