import ReactNative, { Linking } from 'react-native';

import parse from 'url-parse';


export class DeepLinkManager {

    constructor() {
        this.schemas = {};
    }

    checkForInitialDeepLink() {
        Linking.getInitialURL().then(url => {
            url && this._onDeepLink({url});
        });
    }

    register() {
        Linking.addEventListener('url', this._onDeepLink);
    }

    unregister() {
        Linking.removeEventListener('url', this._onDeepLink);
    }

    registerSchema(name, schema, listener = () => {}) {
        this.schemas[name] = {
            schema,
            listener
        };
    }

    unregisterSchema(name) {
        delete this.schemas[name];
    }

    _onDeepLink = (event) => {
        const { url: rawUrl } = event;

        if (rawUrl && typeof rawUrl === 'string') {
            const url = parse(rawUrl);

            schemacheck: for (const schemaKey in this.schemas) {

                if (this.schemas.hasOwnProperty(schemaKey)) {
                    const schema = this.schemas[schemaKey].schema;

                    for (const part in schema) {
                        if (schema.hasOwnProperty(part)) {
                            const value = schema[part];

                            if (part in url) {
                                const validation = url[part] === value || (typeof value === 'function' && value(url[part])) || false;

                                if (!validation) {
                                    continue schemacheck;
                                }
                            }
                        }
                    }
                }


                const listener = this.schemas[schemaKey].listener;

                listener && typeof listener === 'function' && listener({
                    ...event,
                    parsedUrl: url,
                });
            }
        }
    };

}



export default DeepLinkManager;