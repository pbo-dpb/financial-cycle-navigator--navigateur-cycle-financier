<script setup>

import { ref, onMounted, onBeforeUnmount, computed, provide } from 'vue'

const colWidth = ref(0);
const waterfall = ref(null);

const updateColWidth = () => {
    colWidth.value = waterfall.value.clientWidth / 13;
}

onMounted(() => {
    updateColWidth();
    window.addEventListener('resize', () => {
        updateColWidth();
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        updateColWidth();
    })
})

const waterfallStyle = computed(() => {
    if (!colWidth.value) return "";
    const backgroundSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    backgroundSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    backgroundSvg.setAttribute('viewBox', `0 0 ${colWidth.value} 1`);

    const columnCount = 13;
    for (let i = 0; i < columnCount; i++) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', colWidth.value / columnCount);
        rect.setAttribute('height', 1);
        rect.setAttribute('fill', i % 2 === 0 ? '#f8fafc' : '#ffffff');
        rect.setAttribute('x', colWidth.value / columnCount * i);
        backgroundSvg.appendChild(rect);
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const daysSinceBeginningOfYear = Math.floor((Date.parse(`${year}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`) - Date.parse(`${year}-03-01`)) / 86400000);
    const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

    // Draw the current date
    const avgDaysPerMonth = (isLeapYear ? 366 : 365) / 12;
    const extraDays = avgDaysPerMonth * (columnCount - 12);
    const elapsedRatio = daysSinceBeginningOfYear / ((isLeapYear ? 366 : 365) + extraDays);
    const elapsedFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    elapsedFill.setAttribute('width', colWidth.value * elapsedRatio);
    elapsedFill.setAttribute('height', 1);
    elapsedFill.setAttribute('fill', '#2dd4bf');
    elapsedFill.setAttribute('fill-opacity', 0.08);
    elapsedFill.setAttribute('x', 0);

    const endOfElapsedContent = colWidth.value * elapsedRatio;
    const elapsedFillAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    elapsedFillAnimation.setAttribute('attributeName', 'width');
    elapsedFillAnimation.setAttribute('values', `0;${endOfElapsedContent * 0.8};${endOfElapsedContent}`);
    elapsedFillAnimation.setAttribute('dur', '0.55s');
    elapsedFillAnimation.setAttribute('repeatCount', '1');
    elapsedFill.appendChild(elapsedFillAnimation);

    backgroundSvg.appendChild(elapsedFill);
    const elapsedStroke = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    elapsedStroke.setAttribute('width', .2);
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
    return `background-size: ${colWidth.value} 100%;background-image: url(data:image/svg+xml;base64,${btoa(backgroundSvgString)});`
});


</script>
<template>
    <div class="col-span-2 grid grid-cols-13 items-center" ref="waterfall" :style="waterfallStyle">
        <slot></slot>
    </div>
</template>