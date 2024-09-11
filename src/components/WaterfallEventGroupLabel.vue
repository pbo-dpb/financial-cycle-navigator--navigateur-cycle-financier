<template>

    <div class="group border-l-4 border-transparent  pl-2  -ml-2">
        <div class="lg:grid grid-cols-3 gap-x-4">
            <div class="pt-4 border-b-2 border-teal-500 pb-1 text-center text-sm font-semibold text-slate-600">
                <slot></slot>
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