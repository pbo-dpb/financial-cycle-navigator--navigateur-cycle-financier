<template>
  <DebugBar v-if="debug"></DebugBar>

  <div class="flex flex-col lg:grid grid-cols-3 gap-x-4 border-l-4 border-solid border-transparent pl-2 -ml-2">

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

  <aside v-if="notes.length > 0"
    class="mt-8 flex flex-col grid-cols-3 gap-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2 border-solid">
    <div class="text-sm font-semibold">{{ `${strings.notes_label}${notes.length > 1 ? 's' : ''}` }}</div>
    <component :is="notes.length > 1 ? 'ul' : 'div'"
      class="prose dark:prose-invert max-w-none prose-a:text-sky-800 prose-a:dark:text-sky-200 prose-sm prose-p:my-0 ">
      <component :is="notes.length > 1 ? 'li' : 'p'" v-for="(note, index) in notes" :key="index"
        v-html="htmlNotes[index]"></component>
    </component>
  </aside>

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
import { marked } from 'marked';

const DebugBar = defineAsyncComponent(() =>
  import("./components/DebugBar.vue")
);

export default {
  computed: {

    ...mapWritableState(Datasource, ['language', 'highlightEvent']),
    ...mapState(Datasource, ['strings', 'events', 'currentFy', 'notes']),
    htmlNotes() {
      return this.notes.map(note => marked(note[this.language]));
    },
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
    },
    currentFy() {
      this.fetchEvents();
      this.fetchFincies();
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
