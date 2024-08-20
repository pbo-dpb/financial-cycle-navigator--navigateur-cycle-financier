export default class Fincy {
    constructor(obj) {
        obj && Object.assign(this, obj);
        obj.release_date = new Date(obj.release_date);
    }


}