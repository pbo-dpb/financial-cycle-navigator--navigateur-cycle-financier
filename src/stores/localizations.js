import { defineStore } from 'pinia'
import en from '../assets/strings/en.json'
import fr from '../assets/strings/fr.json'

import payload from '../assets/payload.json'
import CycleEvent from '../models/CycleEvent'

export default defineStore('localizations', {
    state: () => ({
        language: document.documentElement.lang,
        iStrings: { en, fr },
        events: payload.events.map((event) => new CycleEvent(event)),

    }),

    getters: {
        strings(state) {
            return state.iStrings[state.language];
        },
    },
})