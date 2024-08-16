<template>
  <DebugBar v-if="debug"></DebugBar>

  <div class="grid grid-cols-3 gap-x-4">

    <div class="flex flex-col gap-4">

    </div>

    <Waterfall class="rounded-t-lg">
      <Month v-for="(month, index) in [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]" :key="month" :month="month"
        :is-previous-year="!index"></Month>
    </Waterfall>

  </div>


  <div class="grid grid-cols-3 gap-x-4 hover:bg-sky-50 dark:hover:bg-sky-900 transition-colors duration-100 group"
    v-for="(ev, index) in events">
    <div class="flex flex-row gap-4 py-4">
      <div class="flex flex-col gap-1 text-right w-full">
        <div class="font-semibold text-slate-700 dark:text-white text-lg">{{ ev.getName(language) }}</div>
        <div>{{ ev.getShortDescription(language) }}</div>
      </div>
      <div class="shrink-0 pt-2">
        <CycleDot :color="ev.color" class="size-4">
        </CycleDot>
      </div>
    </div>

    <Waterfall class="shrink-0" :class="{ 'rounded-b-lg': index === events.length - 1 }">
      <WaterfallEventPeriod :event="ev"></WaterfallEventPeriod>
    </Waterfall>

  </div>





</template>

<script>
import { defineAsyncComponent } from 'vue'
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"
import { mapState, mapWritableState } from 'pinia'
import Datasource from './stores/datasource.js'
import Month from './components/Month.vue'
import Waterfall from './components/Waterfall.vue'
import CycleDot from './components/CycleDot.vue'
import WaterfallEventPeriod from './components/WaterfallEvent/WaterfallEventPeriod.vue'

const DebugBar = defineAsyncComponent(() =>
  import("./components/DebugBar.vue")
);

export default {
  computed: {

    ...mapWritableState(Datasource, ['language', 'highlightEvent']),
    ...mapState(Datasource, ['strings', 'events']),
    debug() {
      return this.$root.debug;
    },
  },


  mounted() {
    this.setPageTitle();
  },
  methods: {
    setPageTitle() {
      (new WrapperEventDispatcher(this.strings.title, null)).dispatch();
    }
  },
  watch: {
    language() {
      this.setPageTitle();
    }
  },
  components: {
    DebugBar,
    Month,
    Waterfall,
    CycleDot,
    WaterfallEventPeriod
  }
};
</script>
<style>
@import "./index.css";
</style>
