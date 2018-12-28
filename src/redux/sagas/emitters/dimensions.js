import { eventChannel } from 'redux-saga';

import { Dimensions } from 'react-native';


export const dimensionChangeEmitter = () => {
    return eventChannel(emitter => {
        const onDimensionChanged = (newDimensions) => {
            emitter(newDimensions);
        };

        Dimensions.addEventListener('change', onDimensionChanged);

        return () => {
            Dimensions.removeEventListener('change', onDimensionChanged);
        }
    });
};

export default dimensionChangeEmitter;