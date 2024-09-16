<script setup>
import { computed, ref, Transition } from 'vue'
import { CalculatorIcon } from '@heroicons/vue/24/outline';

import Waterfall from '../Waterfall.vue'
import CycleDot from '../CycleDot.vue'
import WaterfallEventPeriod from './WaterfallEventPeriod.vue'
import WaterfallEventDetails from './WaterfallEventDetails.vue'
import CycleEvent from '../../models/CycleEvent';
import Datasource from '../../stores/datasource.js'
import Months from '../Months.vue';
import CurrentFiscalYearIndicator from '../CurrentFiscalYearIndicator.vue';
import WaterfallEventReportingIndicator from './WaterfallEventReportingIndicator.vue';
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
        class="group border-l-4 border-transparent open:border-teal-500 pl-2 open:bg-teal-50 dark:open:bg-teal-950 -ml-2 open:my-2 transition-all open:shadow"
        @toggle="(event) => open = event.target.open">
        <summary
            class="list-none lg:grid grid-cols-3 gap-x-4  hover:bg-sky-50 dark:hover:bg-sky-900 group-open:hover:bg-transparent dark:hover:group-open:bg-transparent transition-colors duration-100  cursor-pointer select-none"
            @click="open = !open">
            <div class="flex flex-row gap-4 py-4">
                <div class="flex flex-col gap-1 lg:text-right w-full">
                    <div class="font-semibold text-slate-700 dark:text-white text-lg flex  lg:flex-row lg:justify-end w-full items-center gap-1"
                        :class="{ 'opacity-80': event.previous_spending }">
                        <CalculatorIcon v-if="event.part_of_estimates_process" class="size-5 text-slate-400"
                            aria-hidden="true">
                        </CalculatorIcon>
                        {{ event.getName(language) }}
                    </div>
                    <div class="text-sm">{{ event.getShortDescription(language) }}</div>
                    <WaterfallEventReportingIndicator :event="event" class="flex lg:hidden">
                    </WaterfallEventReportingIndicator>
                </div>
                <div class="hidden lg:block shrink-0 pt-2">
                    <CycleDot :color="event.color" class="size-4">
                    </CycleDot>
                </div>
            </div>

            <Waterfall class="shrink-0 flex flex-col" :class="{ 'rounded-b-lg': isLast }">
                <CurrentFiscalYearIndicator class="lg:hidden"></CurrentFiscalYearIndicator>
                <Months class="grid lg:hidden"
                    :active-months="[3, event.start.getMonth() + 1, event.end ? event.end.getMonth() + 1 : null].filter(x => x)">
                </Months>
                <WaterfallEventPeriod :event></WaterfallEventPeriod>

            </Waterfall>

        </summary>
        <transition enter-from-class="opacity-0" enter-active-class="transition duration-300">
            <WaterfallEventDetails v-if="open" :event>
            </WaterfallEventDetails>
        </transition>
    </details>
</template>