import { defineStore } from 'pinia'
import en from '../assets/strings/en.json'
import fr from '../assets/strings/fr.json'

import payload from '../assets/payload.json'
import CycleEvent from '../models/CycleEvent'
import Fincy from '../models/Fincy'

export default defineStore('datasource', {
    state: () => ({
        language: document.documentElement.lang,
        iStrings: { en, fr },
        events: payload.events.map((event) => new CycleEvent(event)),
        currentDate: (new Date()).toISOString().split('T')[0],
        highlightEvent: null,
        fincies: null
    }),

    getters: {
        strings(state) {
            return state.iStrings[state.language];
        },
    },

    actions: {
        async fetchFincies() {

            const response = await fetch('https://rest-393962616e6b.pbo-dpb.ca/fincies')
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            this.fincies = json.data.map(fincy => new Fincy(fincy));
        }
    }
})