<template>

    <div class="group border-l-4 border-transparent  pl-2  -ml-2">
        <div class="lg:grid grid-cols-3 gap-x-4">
            <div
                class="py-2 -mx-2 ml-0 px-2 text-sm font-semibold text-slate-600 flex flex-row items-center justify-between gap-0.5 bg-gradient-to-br from-gray-50 to-slate-50">


                <slot></slot><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                </svg>
            </div>
            <Waterfall class="shrink-0">
                &nbsp;
            </Waterfall>
        </div>
    </div>
</template>
<script setup>
import Waterfall from './Waterfall.vue';
</script>