<script setup>
import Datasource from '../stores/datasource.js'
import { computed } from 'vue'

const store = Datasource()

const props = defineProps({
    month: {
        type: Number,
        required: true
    },
    isPreviousYear: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: null
    }
})

const strings = computed(() => store.strings)

</script>
<template>
    <div
        class="flex flex-row justify-center text-slate-700 first:text-slate-500 dark:first:text-slate-400 py-2 dark:text-white">
        <span
            class="border-b-2 border-solid lg:border-b-0 border-slate-300 text-center text-xs lg:text-base lg:font-semibold uppercase backdrop-blur-xs rounded-xs w-fit tracking-tight"
            :class="{ 'opacity-50': active === false }">{{
                strings[`month_${String(month).padStart(2, "0")}`]
            }}</span>
    </div>
</template>
