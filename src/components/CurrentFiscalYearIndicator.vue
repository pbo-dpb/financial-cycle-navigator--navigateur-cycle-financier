<template>
    <div></div>
    <div class="col-span-12" v-html="waterfallArrowHtml" ref="waterfall">
    </div>

</template>
<script setup>
const color = "#0f766e";
import { ref, onMounted, onBeforeUnmount, computed, provide } from 'vue'

import Datasource from '../stores/datasource.js'

const store = Datasource()
const currentDateString = computed(() => store.currentDate)
const strings = computed(() => store.strings)

const fiscalYear = computed(() => {
    const currentDate = new Date(currentDateString.value);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const fy = month < 3 ? year - 1 : year;
    return `${fy}-${fy + 1}`;
})

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


const waterfallArrowHtml = computed(() => {
    if (!waterfallWidth.value) return null;
    const containerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    containerSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    containerSvg.setAttribute('viewBox', `0 0 ${waterfallWidth.value} 40`);
    containerSvg.setAttribute('preserveAspectRatio', 'none');

    // Arrow head
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '5');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('fill', color);
    marker.setAttribute('orient', 'auto-start-reverse');
    const markerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    markerPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    marker.appendChild(markerPath);

    defs.appendChild(marker);
    containerSvg.appendChild(defs);



    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', waterfallWidth.value / 2);
    textElement.setAttribute('y', 20);
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('dominant-baseline', 'middle');
    textElement.setAttribute('font-size', 14);
    textElement.setAttribute('font-weight', '500');
    textElement.setAttribute('fill', color);
    textElement.textContent = strings.value.current_fiscal_year + ' ' + fiscalYear.value;
    containerSvg.appendChild(textElement);

    const approxTextWidth = strings.value.current_fiscal_year.length > 20 ? 280 : 220;

    const leftLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftLine.setAttribute('x1', 5);
    leftLine.setAttribute('y1', 20);
    leftLine.setAttribute('x2', (waterfallWidth.value / 2) - (approxTextWidth / 2));
    leftLine.setAttribute('y2', 20);
    leftLine.setAttribute('stroke', color);
    leftLine.setAttribute('stroke-width', 1);
    leftLine.setAttribute('marker-start', 'url(#arrow)');
    containerSvg.appendChild(leftLine);

    const rightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightLine.setAttribute('x1', (waterfallWidth.value / 2) + (approxTextWidth / 2));
    rightLine.setAttribute('y1', 20);
    rightLine.setAttribute('x2', waterfallWidth.value - 5);
    rightLine.setAttribute('y2', 20);
    rightLine.setAttribute('stroke', color);
    rightLine.setAttribute('stroke-width', 1);
    rightLine.setAttribute('marker-end', 'url(#arrow)');
    containerSvg.appendChild(rightLine);

    return containerSvg.outerHTML;
});

</script>