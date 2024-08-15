<template>
  <DebugBar v-if="debug"></DebugBar>

  <div class="grid grid-cols-3 gap-x-4">

    <div class="flex flex-col gap-4">

    </div>

    <Waterfall class="rounded-t-lg">
      <Month v-for="(month, index) in [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]" :key="month" :month="month"
        :is-previous-year="!index"></Month>
    </Waterfall>



    <template v-for="event in events">
      <div class="flex flex-row gap-4 py-4">
        <div class="flex flex-col gap-1 text-right w-full">
          <div class="font-semibold text-slate-700 dark:text-white text-lg">{{ event.getName(language) }}</div>
          <div>{{ event.getShortDescription(language) }}</div>
        </div>
        <div class="shrink-0 pt-2">
          <CycleDot :color="event.color" class="size-4"></CycleDot>
        </div>
      </div>

      <Waterfall class="last:rounded-b-lg shrink-0 ">
        <SingleEvent v-if="event.isSingle" :event="event"></SingleEvent>
        <LapsingEvent v-else :event="event"></LapsingEvent>
      </Waterfall>

    </template>


  </div>



</template>

<script>
import { defineAsyncComponent } from 'vue'
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"
import { mapState, mapWritableState } from 'pinia'
import Localizations from './stores/localizations.js'
import Month from './components/Month.vue'
import Waterfall from './components/Waterfall.vue'
import LapsingEvent from './components/EventBar/LapsingEventBar.vue'
import CycleDot from './components/CycleDot.vue'
import SingleEvent from './components/EventBar/SingleEventBar.vue'

const DebugBar = defineAsyncComponent(() =>
  import("./components/DebugBar.vue")
);

export default {
  computed: {

    ...mapWritableState(Localizations, ['language']),
    ...mapState(Localizations, ['strings', 'events']),
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
    SingleEvent,
    LapsingEvent,
    Waterfall,
    CycleDot
  }
};
</script>
<style>
@import "./index.css";
</style>
