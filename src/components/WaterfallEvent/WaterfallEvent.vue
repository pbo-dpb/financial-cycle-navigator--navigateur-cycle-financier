<script setup>
import { computed, ref } from 'vue'

import Waterfall from '../Waterfall.vue'
import CycleDot from '../CycleDot.vue'
import WaterfallEventPeriod from './WaterfallEventPeriod.vue'
import CycleEvent from '../../models/CycleEvent';
import Datasource from '../../stores/datasource.js'
const store = Datasource()
const language = computed(() => store.language)

const props = defineProps(
    {
        event: CycleEvent,
        isLast: Boolean
    }
)

const open = ref(false);




</script>
<template>
    <details
        class="group border-l-4 border-transparent open:border-teal-500 pl-2 open:bg-teal-50 -ml-2 open:my-2 transition-all">
        <summary
            class="list-none lg:grid grid-cols-3 gap-x-4  hover:bg-sky-50 dark:hover:bg-sky-900 group-open:hover:bg-transparent dark:hover:group-open:bg-transparent transition-colors duration-100  cursor-pointer select-none"
            @click="open = !open">
            <div class="flex flex-row gap-4 py-4">
                <div class="flex flex-col gap-1 text-right w-full">
                    <div class="font-semibold text-slate-700 dark:text-white text-lg ">

                        {{ event.getName(language) }}
                    </div>
                    <div>{{ event.getShortDescription(language) }}</div>
                </div>
                <div class="shrink-0 pt-2">
                    <CycleDot :color="event.color" class="size-4">
                    </CycleDot>
                </div>
            </div>

            <Waterfall class="shrink-0" :class="{ 'rounded-b-lg': isLast }">
                <WaterfallEventPeriod :event="event"></WaterfallEventPeriod>
            </Waterfall>

        </summary>
        <div class=" w-full">

            EXPANDED

        </div>
    </details>
</template>