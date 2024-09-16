<script setup>
import Datasource from '../stores/datasource.js'

const props = defineProps({
    drawBackground: {
        type: Boolean,
        default: true
    }
})

const store = Datasource()
const currentDateString = computed(() => store.currentDate)


import { ref, onMounted, onBeforeUnmount, computed, provide } from 'vue'
const waterfall = ref(null);
const waterfallWidth = ref(0);
const columnCount = ref(13);

const colWidth = computed(() => {
    return waterfallWidth.value / columnCount.value;
})

provide('waterfallColW', colWidth)
const updateWaterfallWidth = () => {
    waterfallWidth.value = waterfall.value.clientWidth;
}

onMounted(() => {
    updateWaterfallWidth();
    window.addEventListener('resize', () => {
        updateWaterfallWidth();
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        updateWaterfallWidth();
    })
})

const waterfallStyle = computed(() => {
    if (!props.drawBackground || !waterfallWidth.value) return "";
    const backgroundSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    backgroundSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    backgroundSvg.setAttribute('viewBox', `0 0 ${waterfallWidth.value} 1`);
    backgroundSvg.setAttribute('preserveAspectRatio', 'none');

    for (let i = 0; i < columnCount.value; i++) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', colWidth.value);
        rect.setAttribute('height', 1);
        rect.setAttribute('fill', i % 2 === 0 ? '#E2EBF3' : '#ffffff');
        rect.setAttribute('fill-opacity', 0.3);
        rect.setAttribute('x', colWidth.value * i);
        backgroundSvg.appendChild(rect);
    }

    const currentDate = new Date(currentDateString.value);
    const year = currentDate.getFullYear();

    const daysSinceBeginningOfYear = Math.floor((new Date(year, currentDate.getMonth(), currentDate.getDate()).getTime() - new Date(currentDate.getMonth() > 2 ? year : (year - 1), 2, 1).getTime()) / 86400000);

    const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

    // Draw the current date
    const avgDaysPerMonth = (isLeapYear ? 366 : 365) / 12;
    const extraDays = avgDaysPerMonth * (columnCount.value - 12);
    const elapsedRatio = daysSinceBeginningOfYear / ((isLeapYear ? 366 : 365) + extraDays);
    const elapsedFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    elapsedFill.setAttribute('width', waterfallWidth.value * elapsedRatio);
    elapsedFill.setAttribute('height', 1);
    elapsedFill.setAttribute('fill', '#2dd4bf');
    elapsedFill.setAttribute('fill-opacity', 0.08);
    elapsedFill.setAttribute('x', 0);

    const endOfElapsedContent = waterfallWidth.value * elapsedRatio;
    const elapsedFillAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    elapsedFillAnimation.setAttribute('attributeName', 'width');
    elapsedFillAnimation.setAttribute('values', `0;${endOfElapsedContent * 0.6};${endOfElapsedContent}`);
    elapsedFillAnimation.setAttribute('dur', '0.55s');
    elapsedFillAnimation.setAttribute('repeatCount', '1');
    elapsedFill.appendChild(elapsedFillAnimation);

    backgroundSvg.appendChild(elapsedFill);
    const elapsedStroke = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    elapsedStroke.setAttribute('width', 2);
    elapsedStroke.setAttribute('height', 1);
    elapsedStroke.setAttribute('fill', '#2dd4bf');
    elapsedStroke.setAttribute('fill-opacity', 0.3);
    const elapsedStrokeAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    elapsedStrokeAnimation.setAttribute('attributeName', 'fill-opacity');
    elapsedStrokeAnimation.setAttribute('values', '0;0.2;0.3');
    elapsedStrokeAnimation.setAttribute('dur', '0.75s');
    elapsedStrokeAnimation.setAttribute('repeatCount', '1');
    elapsedStroke.appendChild(elapsedStrokeAnimation);
    elapsedStroke.setAttribute('x', endOfElapsedContent);

    backgroundSvg.appendChild(elapsedStroke);


    const backgroundSvgString = backgroundSvg.outerHTML;
    return `background-size: 100%;background-image: url(data:image/svg+xml;base64,${btoa(backgroundSvgString)});`
});


</script>
<template>
    <div class="col-span-2 grid grid-cols-13 rounded-lg lg:rounded-none pb-2 lg:pb-0" ref="waterfall"
        :style="waterfallStyle">
        <slot></slot>
    </div>
</template>