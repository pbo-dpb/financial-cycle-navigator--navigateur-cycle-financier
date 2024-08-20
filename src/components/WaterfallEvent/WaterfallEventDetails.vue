<script setup>
import { computed } from 'vue'

import CycleEvent from '../../models/CycleEvent';
import { marked } from 'marked';
import Datasource from '../../stores/datasource.js'
const store = Datasource()
const language = computed(() => store.language)
const strings = computed(() => store.strings)

import { CalculatorIcon, ArrowUturnLeftIcon } from '@heroicons/vue/16/solid';
import WaterfallEventDetailsFincy from './WaterfallEventDetailsFincy.vue';

const props = defineProps({
    event: {
        type: CycleEvent,
        required: true
    }
});

const description = computed(() => {
    return marked(props.event.getLongDescription(language.value));
});


</script>
<template>


    <div class="lg:grid grid-cols-5 gap-4 items-center p-4">

        <div class="col-span-3 p-4 rounded bg-teal-800 text-white  flex flex-col gap-2" :class="{
            'col-start-2 ': !event.fincy_document_type
        }">


            <ul v-if="event.part_of_estimates_process || event.previous_spending"
                class="flex flex-row items-center gap-2">
                <li v-if="event.part_of_estimates_process"
                    class="flex flex-row items-center gap-1 bg-teal-900 rounded-lg  text-sm px-2 w-fit text-center leading-tight">
                    <CalculatorIcon class="size-4" aria-hidden="true"></CalculatorIcon> <span class="font-semibold">{{
                        strings.part_of_the_estimate_process_label }}</span>
                </li>
                <li v-if="event.previous_spending"
                    class="flex flex-row items-center gap-1 bg-teal-900 rounded-lg  text-sm px-2 w-fit text-center leading-tight">
                    <ArrowUturnLeftIcon class="size-4" aria-hidden="true"></ArrowUturnLeftIcon> <span
                        class="font-semibold">{{ strings.previous_spending_label }}</span>
                </li>

            </ul>

            <div class="leading-snug  max-w-none" v-html="description"></div>
        </div>



        <WaterfallEventDetailsFincy class="col-span-2" :event="event" v-if="event.fincy_document_type">
        </WaterfallEventDetailsFincy>



    </div>

</template>