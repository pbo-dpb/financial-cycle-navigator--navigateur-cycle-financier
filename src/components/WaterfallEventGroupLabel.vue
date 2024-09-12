<template>

    <div class="group border-l-4 border-transparent  pl-2  -ml-2">
        <div class="lg:grid grid-cols-3 gap-x-4">
            <div
                class="py-2 -mx-2 ml-0 px-2 text-sm font-semibold text-slate-600 flex flex-row items-center justify-between gap-0.5 bg-gradient-to-br from-gray-50 to-slate-50">


                <slot></slot>
                <ChevronDoubleDownIcon class="size-4 text-slate-600 " aria-hidden="true"></ChevronDoubleDownIcon>

            </div>
            <Waterfall class="shrink-0">
                &nbsp;
            </Waterfall>
        </div>
    </div>
</template>
<script setup>
import { ChevronDoubleDownIcon } from '@heroicons/vue/16/solid';
import Waterfall from './Waterfall.vue';
</script>