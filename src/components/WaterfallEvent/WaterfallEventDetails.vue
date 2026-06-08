<script setup>
import { computed } from "vue";

import CycleEvent from "../../models/CycleEvent";
import { marked } from "marked";
import Datasource from "../../stores/datasource.js";
const store = Datasource();
const language = computed(() => store.language);
const strings = computed(() => store.strings);

import { CalculatorIcon, ArrowUturnLeftIcon } from "@heroicons/vue/16/solid";
import WaterfallEventDetailsFincy from "./WaterfallEventDetailsFincy.vue";
import WaterfallEventDetailsGovdocs from "./WaterfallEventDetailsGovdocs.vue";

const props = defineProps({
  event: {
    type: CycleEvent,
    required: true,
  },
});

const isEconomicAndFiscalUpdate = computed(() => {
  return props.event.fincy_document_type === "economic_and_fiscal_update";
});

const fincies = computed(() => {
  console.log(store.fincies);

  if (!store.fincies) return [];

  if (isEconomicAndFiscalUpdate.value) {
    return store.fincies.filter(
      (fincy) => fincy.document_type === "economic_and_fiscal_update",
    );
  }

  return store.fincies.filter(
    (fincy) => fincy.document_type === props.event.fincy_document_type,
  );
});

const description = computed(() => {
  return marked(props.event.getLongDescription(language.value));
});
</script>
<template>
  <div class="flex-col items-center gap-2 p-4 lg:flex">
    <div
      class="flex w-full flex-col gap-4 rounded-sm bg-teal-800 p-4 text-white"
    >
      <ul
        v-if="event.part_of_estimates_process || event.previous_spending"
        class="flex flex-row items-center gap-2"
      >
        <li
          v-if="event.part_of_estimates_process"
          class="flex w-fit flex-row items-center gap-1 rounded-lg bg-teal-900 px-2 text-center text-sm leading-tight"
        >
          <CalculatorIcon class="size-4" aria-hidden="true"></CalculatorIcon>
          <span class="font-semibold">{{
            strings.part_of_the_estimate_process_label
          }}</span>
        </li>
        <li
          v-if="event.previous_spending"
          class="flex w-fit flex-row items-center gap-1 rounded-lg bg-teal-900 px-2 text-center text-sm leading-tight"
        >
          <ArrowUturnLeftIcon
            class="size-4"
            aria-hidden="true"
          ></ArrowUturnLeftIcon>
          <span class="font-semibold">{{
            strings.previous_spending_label
          }}</span>
        </li>
      </ul>

      <div class="max-w-none leading-snug" v-html="description"></div>

      <WaterfallEventDetailsGovdocs :event="event" v-if="event.govdocs">
      </WaterfallEventDetailsGovdocs>

      <WaterfallEventDetailsFincy
        v-for="fincy in fincies"
        :key="fincy.id"
        :fincy="fincy"
      />
    </div>
  </div>
</template>
