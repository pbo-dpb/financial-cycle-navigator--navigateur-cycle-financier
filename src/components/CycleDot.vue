<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'black'
    }
})
</script>
<template>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="group-hover:drop-shadow-lg transition-shadow">
        <circle cx="48" cy="48" r="48" :fill="color" />
    </svg>
</template>