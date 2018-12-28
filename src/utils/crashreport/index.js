import firebase from '../firebase';


const crashReport = ({ getState }) => next => (action) => {

    try {
        return next(action);
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            firebase.crashlytics().recordError(error.code, error.message);
        } else {
            const errorToReport = new Error(error);
            firebase.crashlytics().recordError(errorToReport.code, errorToReport.message);
        }
    }

};

export default crashReport;