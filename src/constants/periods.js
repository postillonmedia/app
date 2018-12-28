
export const LastWeek = 'LastWeek';
export const LastMonth = 'LastMonth';
export const LastYear = 'LastYear';
export const NoFilter = 'NoFilter';

export const Periods = [
    LastWeek,
    LastMonth,
    LastYear,
    NoFilter
];

export const getDateByPeriod = (period) => {
    let timeShift;

    switch (period) {
        case LastWeek: {
            timeShift = 604800000; // = 1000*60*60*24*7
            break;
        }

        case LastMonth: {
            timeShift = 2592000000; // = 1000*60*60*24*30
            break;
        }

        case LastYear: {
            timeShift = 31536000000; // = 1000*60*60*24*365;
            break;
        }

        case NoFilter:
        default: {
            timeShift = Date.now();
            break;
        }
    }

    return new Date(Date.now() - timeShift);
};

export default {
    LastWeek,
    LastMonth,
    LastYear,
    NoFilter,

    getDateByPeriod,

    Periods,
}