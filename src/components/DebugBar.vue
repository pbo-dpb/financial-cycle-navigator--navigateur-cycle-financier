<template>
    <section
        class="-mx-8 border-y border-gray-300 px-8 py-4 mb-16 bg-gray-100 dark:bg-gray-950 flex flex-row justify-between items-center">
        <div class="font-mono text-gray-800 dark:text-white flex flex-col gap-2">
            <div>🔧 DEBUG</div>
            <label>
                Current date:
                <input type="date" v-model="currentDate">
            </label>
        </div>
        <Button @click="language = (language == 'en') ? 'fr' : 'en'">{{
            language ==
                'en'
                ? 'fr' : 'en' }}</Button>
    </section>
</template>

<script>
import { mapWritableState } from 'pinia'
import Button from './Button.vue'
import Datasource from '../stores/datasource.js'

export default {
    computed: {
        ...mapWritableState(Datasource, ['language', 'currentDate']),
    },

    components: {
        Button,
    },

};
</script>
