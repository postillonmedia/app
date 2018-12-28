/**
 * debouncing, executes the function if there was no new event in $wait milliseconds
 * @param func
 * @param wait
 * @param scope
 * @param immediate
 * @returns {Function}
 */
export const debounce = (func, wait, scope, immediate = true) => {
    let timeoutRefId;
    return function() {
        const context = scope || this;
        const args = arguments;
        const callNow = immediate && !timeoutRefId;

        const later = function() {
            timeoutRefId = null;
            if (!immediate) func.apply(context, args);
        };

        clearTimeout(timeoutRefId);
        timeoutRefId = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};