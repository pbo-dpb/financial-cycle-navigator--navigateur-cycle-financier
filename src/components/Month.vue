<script setup>
import Localizations from '../stores/localizations.js'
import { computed } from 'vue'

const store = Localizations()

const props = defineProps({
    month: {
        type: Number,
        required: true
    },
    isPreviousYear: {
        type: Boolean,
        default: false
    },
})

const strings = computed(() => store.strings)

</script>
<template>
    <div class="flex flex-row justify-center text-slate-700 first:text-slate-500 py-2 ">
        <span class="text-center font-semibold uppercase backdrop-blur-sm rounded-sm w-fit tracking-tight">{{
            strings[`month_${String(month).padStart(2, "0")}`]
            }}</span>
    </div>
</template>
