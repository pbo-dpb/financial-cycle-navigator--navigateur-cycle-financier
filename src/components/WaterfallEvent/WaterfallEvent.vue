<script setup>
    import { computed, ref, Transition } from "vue";
    import { CalculatorIcon } from "@heroicons/vue/24/outline";

    import Waterfall from "../Waterfall.vue";
    import CycleDot from "../CycleDot.vue";
    import WaterfallEventPeriod from "./WaterfallEventPeriod.vue";
    import WaterfallEventDetails from "./WaterfallEventDetails.vue";
    import CycleEvent from "../../models/CycleEvent";
    import Datasource from "../../stores/datasource.js";
    import Months from "../Months.vue";
    import CurrentFiscalYearIndicator from "../CurrentFiscalYearIndicator.vue";
    import WaterfallEventReportingIndicator from "./WaterfallEventReportingIndicator.vue";
    const store = Datasource();
    const language = computed(() => store.language);

    const props = defineProps({
        event: CycleEvent,
        isLast: Boolean,
    });

    const open = ref(false);
</script>
<template>
    <details
        class="group -ml-2 border-l-4 border-solid border-transparent pl-2 transition-all open:my-2 open:border-teal-500 open:bg-teal-50 open:shadow-sm dark:open:bg-teal-950"
        @toggle="(event) => (open = event.target.open)">
        <summary
            class="cursor-pointer list-none grid-cols-3 gap-x-4 transition-colors duration-100 select-none hover:bg-sky-50 hover:group-open:bg-transparent lg:grid dark:hover:bg-sky-900 dark:group-open:hover:bg-transparent">
            <div class="flex flex-row gap-4 py-4">
                <div class="flex w-full flex-col gap-1 lg:text-right">
                    <div
                        class="flex w-full items-center gap-1 text-lg font-semibold text-slate-700 lg:flex-row lg:justify-end dark:text-white"
                        :class="{ 'opacity-80': event.previous_spending }">
                        <CalculatorIcon
                            v-if="event.part_of_estimates_process"
                            class="size-5 text-slate-400"
                            aria-hidden="true">
                        </CalculatorIcon>
                        {{ event.getName(language) }}
                    </div>
                    <div class="text-sm">
                        {{ event.getShortDescription(language) }}
                    </div>
                    <WaterfallEventReportingIndicator
                        :event="event"
                        class="flex lg:hidden">
                    </WaterfallEventReportingIndicator>
                </div>
                <div class="hidden shrink-0 pt-2 lg:block">
                    <CycleDot
                        :color="event.color"
                        class="size-4">
                    </CycleDot>
                </div>
            </div>

            <Waterfall
                class="flex shrink-0 flex-col"
                :class="{ 'rounded-b-lg': isLast }">
                <CurrentFiscalYearIndicator
                    class="lg:hidden"></CurrentFiscalYearIndicator>
                <Months
                    class="grid lg:hidden"
                    :active-months="
                        [
                            3,
                            event.start.getMonth() + 1,
                            event.end ? event.end.getMonth() + 1 : null,
                        ].filter((x) => x)
                    ">
                </Months>
                <WaterfallEventPeriod :event></WaterfallEventPeriod>
            </Waterfall>
        </summary>
        <transition
            enter-from-class="opacity-0"
            enter-active-class="transition duration-300">
            <WaterfallEventDetails
                v-if="open"
                :event>
            </WaterfallEventDetails>
        </transition>
    </details>
</template>
