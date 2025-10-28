
export default class CycleEvent {
    constructor(obj) {
        obj && Object.assign(this, obj.details);


        this.part_of_estimates_process = obj.details.part_of_estimates_process || false;

        this.previous_spending = obj.details.previous_spending || false;

        this.start = new Date((new Date()).getFullYear(), parseInt(obj.details.start.split("-")[0]) - 1, parseInt(obj.details.start.split("-")[1]));

        this.end = obj.details.end ? new Date((new Date()).getFullYear(), parseInt(obj.details.end.split("-")[0]) - 1, parseInt(obj.details.end.split("-")[1])) : null;

        this.fincy_document_type = obj.details.fincy_document_type || null;


        this.govdocs = {
            "en": obj.govdocs?.en ?? [],
            "fr": obj.govdocs?.fr ?? []
        };

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