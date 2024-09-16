<template>

    <div class="group border-l-4 border-transparent  lg:pl-2  lg:-ml-2">
        <div class="lg:grid grid-cols-3 gap-x-4">
            <div
                class="border-b-2 lg:border-0 lg:py-2 lg:-mx-2 lg:ml-0 lg:px-2 text-lg lg:text-sm font-semibold text-slate-600 flex flex-row items-center justify-between gap-0.5 lg:bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 dark:text-slate-400">


                <slot></slot>
                <ChevronDoubleDownIcon class="hidden lg:block size-4 text-slate-600 " aria-hidden="true">
                </ChevronDoubleDownIcon>

            </div>
            <Waterfall class="hidden lg:grid shrink-0">
                &nbsp;
            </Waterfall>
        </div>
    </div>
</template>
<script setup>
import { ChevronDoubleDownIcon } from '@heroicons/vue/16/solid';
import Waterfall from './Waterfall.vue';
</script>