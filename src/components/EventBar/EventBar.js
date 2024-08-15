export { props, getBaseGridClasses }
import CycleEvent from '../../models/CycleEvent';


const props = {
    event: {
        type: CycleEvent,
    }
}

const getBaseGridClasses = () => {
    return [
        "bg-red-600"
    ]
}