<script setup>
import Month from './Month.vue'
const props = defineProps({
    'activeMonths': {
        type: Array,
        required: false
    }
})

</script>
<template>
    <Month v-for="(month, index) in [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]" :key="month" :month="month"
        :is-previous-year="!index" v-bind="$attrs" :active="activeMonths ? activeMonths.includes(month) : null"></Month>
</template>