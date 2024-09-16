<script setup>

import { computed, } from 'vue'
import { CheckIcon, ClockIcon } from '@heroicons/vue/24/outline';

import govGlyph from "../../assets/gov-glyph.svg?url"
import pboGlyph from "../../assets/pbo-glyph.svg?url"

import Datasource from '../../stores/datasource.js'
const store = Datasource()
const strings = computed(() => store.strings)
const props = defineProps({

    type: {
        type: String,
        required: true
    },
    upcoming: {
        type: Boolean,
        default: false
    }
});
</script>
<template>
    <div class="flex flex-row gap-0.5 items-center shrink-0 border border-teal-500 rounded p-0.5 text-teal-600"
        v-tooltip="strings[`readyness_${type}_${upcoming ? 'upcoming' : 'released'}`]">
        <img :src="type === 'gov' ? govGlyph : pboGlyph" class="size-4 shrink-0" alt="">
        <ClockIcon v-if="upcoming" class="size-4 shrink-0"></ClockIcon>
        <CheckIcon v-else class="size-4 shrink-0"></CheckIcon>
    </div>
</template>