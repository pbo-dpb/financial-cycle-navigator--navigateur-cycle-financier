<template>
  <section
    class="-mx-8 mb-16 flex flex-row items-center justify-between border-y border-gray-300 bg-gray-100 px-8 py-4 dark:bg-gray-950"
  >
    <div class="flex flex-col gap-2 font-mono text-gray-800 dark:text-white">
      <div>🔧 DEBUG</div>
      <label>
        Current date (FY {{ currentFy }}):
        <input type="date" v-model="currentDate" />
      </label>
    </div>
    <Button @click="language = language == 'en' ? 'fr' : 'en'">{{
      language == "en" ? "fr" : "en"
    }}</Button>
  </section>
</template>

<script>
import { mapWritableState } from "pinia";
import Button from "./Button.vue";
import Datasource from "../stores/datasource.js";

export default {
  computed: {
    ...mapWritableState(Datasource, ["language", "currentDate", "currentFy"]),
  },

  components: {
    Button,
  },
};
</script>
