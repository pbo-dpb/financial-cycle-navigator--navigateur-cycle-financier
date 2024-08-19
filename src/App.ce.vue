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

  <WaterfallEvent v-for="(ev, index) in events" :key="ev.id" :event="ev" :is-last="index === events.length - 1">
  </WaterfallEvent>





</template>

<script>
import { defineAsyncComponent } from 'vue'
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"
import { mapState, mapWritableState } from 'pinia'
import Datasource from './stores/datasource.js'
import Month from './components/Month.vue'
import Waterfall from './components/Waterfall.vue'
import WaterfallEvent from './components/WaterfallEvent/WaterfallEvent.vue'

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
    WaterfallEvent
  }
};
</script>
<style>
@import "./index.css";
</style>
