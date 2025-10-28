import { defineStore } from 'pinia'
import en from '../assets/strings/en.json'
import fr from '../assets/strings/fr.json'

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
        fyevents: [],
        notes: []
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

            const response = await fetch(`https://rest-393962616e6b.pbo-dpb.ca/fincies/${this.currentFyStartYear}`)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            this.fincies = json.data.map(fincy => new Fincy(fincy));
        },
        async fetchEvents() {

            if (this.fyevents.length === 0) {
                const response = await fetch('https://pfcn-ecfp.pbo-dpb.ca/fyevents.json')
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const fyevents = await response.json();
                this.fyevents = fyevents;
            }

            let currentFyInfo = this.fyevents.find(event => event.year === this.currentFy);

            // If current FY was not added yet, return last available FY
            if (!currentFyInfo) {
                currentFyInfo = this.fyevents[this.fyevents.length - 1];
            } else {
                this.notes = currentFyInfo.notes || [];
            }

            this.events = currentFyInfo.events.map((fyevent) => {

                let fyEventObject = {
                    // Do not include govdocs from other fiscal years
                    govdocs: currentFyInfo.year === this.currentFy ? fyevent.govdocs : [],
                    details: fyevent.details

                }

                // Use previous years details if none are available
                let counter = 1;
                while (!fyEventObject.details) {
                    const previousFyInfo = this.fyevents[this.fyevents.length - counter];
                    fyEventObject.details = previousFyInfo.events.find(e => e.id === fyevent.id)?.details;
                    counter++;
                }




                return fyEventObject;

            }).map((event) => new CycleEvent(event));
        }
    },

})