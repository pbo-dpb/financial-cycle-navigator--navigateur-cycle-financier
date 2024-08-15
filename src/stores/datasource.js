import { defineStore } from 'pinia'
import en from '../assets/strings/en.json'
import fr from '../assets/strings/fr.json'

import payload from '../assets/payload.json'
import CycleEvent from '../models/CycleEvent'

export default defineStore('datasource', {
    state: () => ({
        language: document.documentElement.lang,
        iStrings: { en, fr },
        events: payload.events.map((event) => new CycleEvent(event)),
        currentDate: (new Date()).toISOString().split('T')[0],
        highlightEvent: null,
    }),

    getters: {
        strings(state) {
            return state.iStrings[state.language];
        },
    },
})