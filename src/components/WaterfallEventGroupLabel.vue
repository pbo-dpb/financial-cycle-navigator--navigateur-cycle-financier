<template>
    <div
        class="group border-l-4 border-solid border-transparent lg:-ml-2 lg:pl-2">
        <div class="grid-cols-3 gap-x-4 lg:grid">
            <div
                class="flex flex-row items-center justify-between gap-0.5 border-b-2 border-solid from-gray-50 to-slate-50 text-lg font-semibold text-slate-600 lg:-mx-2 lg:ml-0 lg:border-0 lg:bg-linear-to-br lg:px-2 lg:py-2 lg:text-sm dark:from-gray-900 dark:to-slate-900 dark:text-slate-400">
                <slot></slot>
                <ChevronDoubleDownIcon
                    class="hidden size-4 text-slate-600 lg:block"
                    aria-hidden="true">
                </ChevronDoubleDownIcon>
            </div>
            <Waterfall class="hidden shrink-0 lg:grid"> &nbsp; </Waterfall>
        </div>
    </div>
</template>
<script setup>
    import { ChevronDoubleDownIcon } from "@heroicons/vue/16/solid";
    import Waterfall from "./Waterfall.vue";
</script>
