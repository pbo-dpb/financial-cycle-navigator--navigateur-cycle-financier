<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'black'
    },
    width: {
        type: Number,
        default: 16
    },
})
</script>
<template>
    <svg :viewBox="`0 0 ${props.width} 16`" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect :width="props.width" height="100%" rx="4" :fill="color" />
    </svg>
</template>