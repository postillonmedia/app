import { eventChannel } from 'redux-saga';


export const realmCollectionChangeEmitter = (realmCollection) => {
    return eventChannel(emitter => {

        const eventListener = (collection, changes) => {
            // const { insertions, modifications, deletions } = changes;
            emitter({
                collection,
                changes,
            });
        };

        realmCollection.addListener(eventListener);

        return () => {
            realmCollection.removeListener(eventListener);
        }
    });
};

export default realmCollectionChangeEmitter;