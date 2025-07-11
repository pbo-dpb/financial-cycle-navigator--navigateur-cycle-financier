<template>
    <div class="border border-solid border-purple-100 rounded-sm dark:border-purple-900 shadow-sm">
        <h3 class="p-4 border-b border-solid border-purple-100 dark:border-purple-900 flex flex-col">

            <button :id="uid + '-header'" :aria-controls="uid = '-panel'" :aria-expanded="!shouldCollapse"
                @click="toggle"
                class=" flex flex-row gap-2 items-center text-blue-800 dark:text-blue-100 font-semibold">
                <ChevronRightIcon class="w-6 h-6" v-if="shouldCollapse"></ChevronRightIcon>
                <ChevronDownIcon class="w-6 h-6" v-else></ChevronDownIcon>
                {{ strings.collapsible_component_handle }}
            </button>
        </h3>
        <section :id="uid + '-panel'" :aria-labelledby="uid + '-header'" :hidden="shouldCollapse"
            class="px-4 prose dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:font-light prose-a:text-blue-800 dark:prose-a:text-blue-200">
            <div v-if="collapsibleContent" class="flex flex-col">
                <div v-html="collapsibleContent"></div>

            </div>
            <LoadingIndicator class="w-6 h-6 mb-5" v-else></LoadingIndicator>
        </section>
    </div>
</template>
<script>
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import introEn from '../assets/intro.en.md?url'
import introFr from '../assets/intro.fr.md?url'
import { lastUpdated } from "../static-variables.js"

import { mapState } from 'pinia'
import Datasource from '../stores/datasource.js'

import LoadingIndicator from './LoadingIndicator.vue';
import { marked } from 'marked';

export default {
    data() {
        return {
            lastUpdated,
            shouldCollapse: false,
            uid: `collapsible-${Math.random().toString(36).slice(2, 7)}`,
            fetching: false,
            content: {
                en: null,
                fr: null
            }
        };
    },
    created() {
        try {
            const userPreference = window.localStorage.getItem(this.localStorageKey);
            if (userPreference)
                this.shouldCollapse = true;
        }
        catch (error) {
            // Fail silently
        }
    },

    computed: {
        ...mapState(Datasource, ['strings', 'language']),

        collapsibleContent() {

            if (this.content[this.language])
                return marked.parse(this.content[this.language])
            else if (this.fetching !== this.language)
                this.fetchContent(this.language);
            return null;
        },

        localStorageKey() {
            return `fcn-ncf.collapse.${this.lastUpdated}`
        }
    },
    methods: {
        async fetchContent(language) {
            this.fetching = language;
            let url = language === 'en' ? introEn : introFr;

            const response = await fetch(url);
            let markdown = await response.text();
            this.content[language] = markdown;
            this.fetching = null;
        },
        toggle() {
            this.shouldCollapse = !this.shouldCollapse;
            try {
                if (this.shouldCollapse)
                    window.localStorage.setItem(this.localStorageKey, "TRUE");
                else
                    window.localStorage.removeItem(this.localStorageKey);
            }
            catch (error) {
                // Fail silently
            }
        }
    },
    components: { ChevronRightIcon, ChevronDownIcon, LoadingIndicator }
}

</script>