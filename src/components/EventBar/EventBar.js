export { commonProps, getBaseGridClasses, getLeftPadding }
import CycleEvent from '../../models/CycleEvent';


const commonProps = {
    event: {
        type: CycleEvent,
    }
}

const getBaseGridClasses = () => {
    return [
        "pt-6"
    ]
}

const getLeftPadding = (startDate, colWidth) => {
    const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    const percentageOfStartDateInMonth = startDate.getDate() / daysInMonth;
    return colWidth * percentageOfStartDateInMonth;
}