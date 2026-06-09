<script setup>
    import Datasource from "../stores/datasource.js";
    import { computed } from "vue";

    const store = Datasource();

    const props = defineProps({
        month: {
            type: Number,
            required: true,
        },
        isPreviousYear: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: null,
        },
    });

    const strings = computed(() => store.strings);
</script>
<template>
    <div
        class="flex flex-row justify-center py-2 text-slate-700 first:text-slate-500 dark:text-white dark:first:text-slate-400">
        <span
            class="w-fit rounded-xs border-b-2 border-solid border-slate-300 text-center text-xs tracking-tight uppercase backdrop-blur-xs lg:border-b-0 lg:text-base lg:font-semibold"
            :class="{ 'opacity-50': active === false }"
            >{{ strings[`month_${String(month).padStart(2, "0")}`] }}</span
        >
    </div>
</template>
