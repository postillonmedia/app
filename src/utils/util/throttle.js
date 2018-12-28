/**
 * In case of a "storm of events", this executes once every $threshold
 * @param fn
 * @param threshold
 * @param scope
 * @returns {Function}
 */
export const throttle = function(fn, threshold, scope) {
    threshold || (threshold = 250);
    let last, deferTimer;

    return function() {
        const context = scope || this;
        const now = +new Date();
        const args = arguments;

        if (last && now < last + threshold) {
            // Hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args);
            }, threshold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};