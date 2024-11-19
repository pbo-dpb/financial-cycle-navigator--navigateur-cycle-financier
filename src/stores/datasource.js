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
        events: [],
        currentDate: (new Date()).toISOString().split('T')[0],
        highlightEvent: null,
        fincies: null,
        govdocs: null,
    }),

    getters: {
        strings(state) {
            return state.iStrings[state.language];
        },
        currentFyStartYear(state) {
            // Get the current fiscal year. This will be invalid for a few hours on April 1st. ¯\_(ツ)_/¯ 

            const currentDate = new Date(state.currentDate);
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();

            let firstYear = currentYear;
            if (currentMonth < 3) {
                firstYear = currentYear - 1;
            }
            return firstYear;
        },
        currentFy() {
            const firstYear = this.currentFyStartYear;
            return firstYear.toString().slice(2) + (firstYear + 1).toString().slice(2);
        }
    },

    actions: {
        async fetchFincies() {

            const response = await fetch('https://rest-393962616e6b.pbo-dpb.ca/fincies')
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            this.fincies = json.data.map(fincy => new Fincy(fincy));
        },
        async fetchEvents() {

            if (!this.govdocs) {
                const response = await fetch('https://pfcn-ecfp.pbo-dpb.ca/govdocs.json')
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const govdocs = await response.json();
                this.govdocs = govdocs;
            }

            const currentFyGovdocs = this.govdocs[this.currentFy];

            this.events = payload.events.map((event) => new CycleEvent(event, currentFyGovdocs));
        }
    },

})