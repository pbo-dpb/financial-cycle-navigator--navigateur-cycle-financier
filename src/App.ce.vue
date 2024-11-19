<template>
  <DebugBar v-if="debug"></DebugBar>

  <div class="flex flex-col lg:grid grid-cols-3 gap-x-4 border-l-4 border-transparent pl-2 -ml-2">

    <div class="col-span-3 mb-4">
      <CollapsibleIntro></CollapsibleIntro>
    </div>

    <div class="flex flex-col gap-4">
      &nbsp;
    </div>

    <Waterfall class="hidden lg:grid" :draw-background="false">

      <CurrentFiscalYearIndicator></CurrentFiscalYearIndicator>

    </Waterfall>

    <div class="hidden lg:flex flex-col gap-4">

    </div>

    <Waterfall class="hidden lg:grid rounded-t-lg">
      <Months></Months>
    </Waterfall>

  </div>

  <WaterfallEventGroupLabel>{{ strings.planned_spending_label }}</WaterfallEventGroupLabel>

  <WaterfallEvent v-for="(ev, index) in eventGroups.planned_spending" :key="ev.id" :event="ev"
    :is-last="index === events.length - 1">

  </WaterfallEvent>


  <WaterfallEventGroupLabel class="mt-8 lg:mt-0">{{ strings.previous_spending_label }}</WaterfallEventGroupLabel>
  <WaterfallEvent v-for="(ev, index) in eventGroups.previous_spending" :key="ev.id" :event="ev"
    :is-last="index === events.length - 1">
  </WaterfallEvent>

</template>

<script>
import { defineAsyncComponent } from 'vue'
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"
import { mapState, mapWritableState, mapActions } from 'pinia'
import Datasource from './stores/datasource.js'
import Months from './components/Months.vue'
import Waterfall from './components/Waterfall.vue'
import WaterfallEvent from './components/WaterfallEvent/WaterfallEvent.vue'
import CollapsibleIntro from './components/CollapsibleIntro.vue'
import CurrentFiscalYearIndicator from './components/CurrentFiscalYearIndicator.vue'
import WaterfallEventGroupLabel from './components/WaterfallEventGroupLabel.vue'

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

    eventGroups() {
      return {
        previous_spending: this.events.filter(ev => ev.previous_spending),
        planned_spending: this.events.filter(ev => !ev.previous_spending),
      }
    }

  },


  mounted() {
    this.setPageTitle();
    this.fetchEvents();
    this.fetchFincies();
  },
  methods: {
    ...mapActions(Datasource, ['fetchFincies', 'fetchEvents']),
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
    Months,
    Waterfall,
    WaterfallEvent,
    CollapsibleIntro,
    CurrentFiscalYearIndicator,
    WaterfallEventGroupLabel
  }
};
</script>
<style>
@import "./index.css";
</style>
