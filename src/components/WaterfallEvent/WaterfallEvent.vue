<script setup>
import { computed } from 'vue'

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

</script>
<template>
    <div class="grid grid-cols-3 gap-x-4 hover:bg-sky-50 dark:hover:bg-sky-900 transition-colors duration-100 group">
        <div class="flex flex-row gap-4 py-4">
            <div class="flex flex-col gap-1 text-right w-full">
                <div class="font-semibold text-slate-700 dark:text-white text-lg">{{ event.getName(language) }}</div>
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

    </div>
</template>