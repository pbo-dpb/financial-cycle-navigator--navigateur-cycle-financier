export default class CycleEvent {
    constructor(obj) {
        obj && Object.assign(this, obj);


        this.part_of_estimates_process = obj.part_of_estimates_process || false;
        this.start = new Date(obj.start);
        this.end = obj.end ? new Date(obj.end) : null;
        this.fincy_tag = obj.fincy_tag || null;

        if (!this.color && this.part_of_estimates_process) {
            this.color = "#14b8a6";
        } else if (!this.color) {
            this.color = "#64748b";
        }

    }

    getName(language) {
        return this["name_" + language];
    }

    getShortDescription(language) {
        return this["short_description_" + language];
    }

    getLongDescription(language) {
        return this["long_description_" + language];
    }

    get isSingle() {
        return !this.end;
    }

}