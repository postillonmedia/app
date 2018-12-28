import * as Feather from 'react-native-vector-icons/Feather';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    'grid': [50, '#000000'],
    'home': [50, '#000000'],
    'bookmark': [50, '#000000'],
    'more-horizontal': [50, '#000000'],

    'search': [30, '#000000'],
    'x': [30, '#000000'],
};

const defaultIconProvider = Feather;

let iconsMap = {};
let isIconsMapLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Feather

            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1]
            );
        })
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx]);

        // Call resolve (and we are done)
        resolve(true);
    })
});

export {
    iconsMap,
    isIconsMapLoaded
};