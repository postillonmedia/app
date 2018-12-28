/**
 * Created by DanielL on 18.06.2017.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { View } from 'react-native';

import Text from './renderer/text';
import ViewWrapper from './renderer/wrapper';
import TextWrapper from './renderer/textwrapper';

import { DomHandler, Parser } from 'htmlparser2';

import * as HTMLRenderer from './renderer';
import { BLOCK_TAGS, TEXT_TAGS, MIXED_TAGS, IGNORED_TAGS, TEXT_TAGS_IGNORING_ASSOCIATION, STYLESETS, TextOnlyPropTypes } from "./HTMLUtils";


export class ContentView extends PureComponent {

    static displayName = 'Content';
    static componentName = 'Content';

    static propTypes = {
        html: PropTypes.string.isRequired,
        baseUrl: PropTypes.string,

        renderers: PropTypes.object.isRequired,

        decodeEntities: PropTypes.bool.isRequired,
        ignoredTags: PropTypes.array.isRequired,
        onParsed: PropTypes.func,
        onParseError: PropTypes.func,

        alterData: PropTypes.func,
        alterChildren: PropTypes.func,
        alterNode: PropTypes.func,

        emSize: PropTypes.number.isRequired,
        baseFontSize: PropTypes.number.isRequired,
        textSelectable: PropTypes.bool,

        imagesToExclude: PropTypes.arrayOf(PropTypes.string),
        renderAd: PropTypes.func,
    };

    static defaultProps = {
        renderers: HTMLRenderer,

        decodeEntities: true,
        ignoredTags: IGNORED_TAGS,

        emSize: 14,
        baseFontSize: 14,
        textSelectable: false,

        imagesToExclude: [],
        renderAd: () => null,
    };

    static childContextTypes = {
        dom: PropTypes.arrayOf(PropTypes.object),
    };

    constructor(props, context, updater) {
        super(props, context, updater);

        this.renderers = {
            ...HTMLRenderer,
            ...(this.props.renderers || {})
        };

        this.state = {
            dom: [],
        };
    }

    componentDidMount() {
        this.parse();
    }

    componentWillReceiveProps(nextProps) {
        const {
            html: nextHtml,
            baseUrl: nextBaseUrl,
            renderers: nextRenderers,
            baseFontSize: nextFontSize,
            theme: nextTheme,
        } = nextProps;

        const {
            html: currentHtml,
            baseUrl: currentBaseUrl,
            renderers: currentRenderers,
            baseFontSize: currentFontSize,
            theme: currentTheme,
        } = this.props;

        if (nextHtml !== currentHtml) {
            // needs to be parsed
            this.parse(nextProps);
        } else {
            // does not need to be parsed
            let needsRerendering = false;

            if (nextBaseUrl !== currentBaseUrl) {
                needsRerendering = true;
            }

            if (nextRenderers !== currentRenderers) {
                this.renderers = {
                    ...HTMLRenderer,
                    ...(nextRenderers || {})
                };

                needsRerendering = true;
            }

            if (nextTheme !== currentTheme) {
                needsRerendering = true;
            }

            if (nextFontSize !== currentFontSize) {
                needsRerendering = true;
            }

            if (needsRerendering === true) {
                this.rerenderRNElements(nextProps);
            }
        }
    }

    getChildContext = () => {
        const { dom } = this.state;

        return {
            dom,
        };
    };

    parse = (props = this.props) => {
        const { html, decodeEntities, onParsed, onParseError } = props;

        const domHandler = new DomHandler((err, dom) => {
            if (err !== null) {
                onParseError && onParseError(err);
                return;
            }

            this.setState({dom});

            let RNElements = this.mapDomNodesToRNElements(dom, false, props);

            if (onParsed) {
                const alteredRNElements = onParsed(dom, RNElements);
                if (alteredRNElements) {
                    RNElements = alteredRNElements;
                }
            }

            this.setState({
                RNElements,
                RNNodes: this.renderRNElements(RNElements, 'root', 0, props, dom),
            });
        });

        const parser = new Parser(domHandler, {
            decodeEntities: decodeEntities,
        });

        parser.write(html);
        parser.done();
    };

    rerenderRNElements = (props = this.props) => {
        const { RNElements } = this.state;

        RNElements && this.setState({
            RNNodes: this.renderRNElements(RNElements, 'root', 0, props),
        });
    };

    /**
     * Maps the DOM nodes parsed by htmlparser2 into a simple structure that will be easy to render with
     * native components. It removes ignored tags, chooses the right wrapper for each set of children
     * to ensure we're not wrapping views inside texts and improves the structure recursively
     * to prevent erratic rendering.
     * @param {array} DOMNodes
     * @param {boolean} [parentTag=false]
     * @returns
     */
    mapDomNodesToRNElements = (DOMNodes, parentTag = false, props = this.props) => {
        const { ignoreNodesFunction, ignoredTags, alterNode, alterData, alterChildren, tagsStyles, classesStyles } = props;

        let RNElements = DOMNodes.map((node, nodeIndex) => {
            let { children, data } = node;

            if (ignoredTags.map((tag) => tag.toLowerCase()).indexOf(node.name && node.name.toLowerCase()) !== -1) {
                return false;
            }

            if (alterNode) {
                const alteredNode = alterNode(node);
                node = alteredNode || node;
            }
            const { type, attribs, name, parent } = node;

            if (alterData && data) {
                const alteredData = alterData(node);
                data = alteredData || data;
            }
            if (alterChildren && children) {
                const alteredChildren = alterChildren(node);
                children = alteredChildren || children;
            }

            // Remove whitespaces to check if it's just a blank text
            const strippedData = data && data.replace(/\s/g, '');

            if (type === 'text') {
                if (!strippedData || !strippedData.length) {
                    // This is blank, don't render an useless additional component
                    return false;
                }
                // Text without tags, these can be mapped to the Text wrapper
                return {
                    wrapper: 'Text',
                    data: data.replace(/(\r\n|\n|\r)/gm, ''), // remove linebreaks
                    attribs: attribs || {},
                    parent,
                    parentTag: parent && parent.name,
                    tagName: name || 'rawtext'
                };
            }

            if (type === 'tag' || type === 'script') {
                const rawChildren = children;
                if (children) {
                    // Recursively map all children with this method
                    children = this.associateRawTexts(this.mapDomNodesToRNElements(children, name));
                }
                if (this.childrenNeedAView(children) || BLOCK_TAGS.indexOf(name.toLowerCase()) !== -1) {
                    // If children cannot be nested in a Text, or if the tag
                    // maps to a block element, use a view
                    return { wrapper: 'View', children, rawChildren, attribs, parent, tagName: name, parentTag };
                } else if (TEXT_TAGS.indexOf(name.toLowerCase()) !== -1 || MIXED_TAGS.indexOf(name.toLowerCase()) !== -1) {
                    // We are able to nest its children inside a Text
                    return { wrapper: 'Text', children, rawChildren, attribs, parent, tagName: name, parentTag };
                } else if (this.renderers[name] && this.renderers[name].wrapper) {
                    return { wrapper: this.renderers[name].wrapper, children, rawChildren, attribs, parent, tagName: name, parentTag };
                }
                return { wrapper: 'View', children, rawChildren, attribs, parent, tagName: name, parentTag };
            }
        })
            .filter((parsedNode) => parsedNode !== false && parsedNode !== undefined) // remove useless nodes
            .map((parsedNode, nodeIndex) => {
                const { wrapper, children, attribs, tagName } = parsedNode;
                const firstChild = children && children[0];
                if (firstChild && children.length === 1) {
                    // Specific tweaks for wrappers with a single child
                    if ((attribs === firstChild.attribs || !firstChild.attribs) &&
                        firstChild.wrapper === wrapper &&
                        (tagName === firstChild.tagName || firstChild.tagName === 'rawtext')) {
                        // If the only child of a node is using the same wrapper, merge them into one
                        return {
                            ...parsedNode,
                            attribs: { ...attribs, ...firstChild.attribs },
                            data: firstChild.data,
                            children: [],
                            tagName,
                            nodeIndex
                        };
                    }
                }
                return { ...parsedNode, nodeIndex };
            });

        return this.associateRawTexts(RNElements);
    };

    /**
     * Loops on children an find texts that need to be wrapped so we don't render line breaks
     * The wrapper can either be a <p> when it should be a paragraph, or a custom tag named
     * "textwrapper", which renders a plain <Text> component.
     * @param {any} children
     * @returns {array}
     */
    associateRawTexts = (children) => {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if ((child.wrapper === 'Text' && TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(child.tagName) === -1) && children.length > 1 && (!child.parent || child.parent.name !== 'p')) {

                // Texts outside <p> or not <p> themselves (with siblings)
                let wrappedTexts = [];
                for (let j = i; j < children.length; j++) {
                    // Loop on its next siblings and store them in an array
                    // until we encounter a block or a <p>
                    let nextSibling = children[j];
                    if (nextSibling.wrapper !== 'Text' || TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(nextSibling.tagName) !== -1) {
                        break;
                    }
                    wrappedTexts.push(nextSibling);
                    // Remove the child that has been nested
                    children[j] = false;
                }

                // Replace the raw text with a <p> that has wrappedTexts as its children
                if (wrappedTexts.length) {
                    children[i] = {
                        attribs: {},
                        children: wrappedTexts,
                        nodeIndex: i,
                        parent: child.parent,
                        parentTag: child.parentTag,
                        tagName: child.parent && child.parent.name === 'li' ? 'textwrapper' : 'p',
                        wrapper: 'Text'
                    };
                }
            }
        }
        return children.filter((parsedNode) => parsedNode !== false && parsedNode !== undefined);
    };

    /**
     * Loop on children and return whether if their parent needs to be a <View>
     * @param {any} children
     * @returns {boolean}
     * @memberof HTML
     */
    childrenNeedAView = (children) => {
        for (let i = 0; i < children.length; i++) {
            if (children[i].wrapper === 'View') {
                // If we find at least one View, it has to be nested in one
                return true;
            }
        }
        // We didn't find a single view, it can be wrapped in a Text
        return false;
    };

    wrapperHasTextChild = (children) => {
        for (let i = 0; i < children.length; i++) {
            if (children[i].wrapper === 'Text') {
                return true;
            }
        }
        return false;
    };



    /**
     * Takes the parsed nodes from mapDOMNodesTORNElements and actually renders native components.
     * Calls the utils that convert the CSS into react-native compatible styles and renders custom
     * components when needed.
     * @param {boolean} RNElements
     * @param {string} [parentWrapper='root']
     * @param {number} [parentIndex=0]
     * @returns {array}
     */
    renderRNElements = (RNElements, parentWrapper = 'root', parentIndex = 0, props = this.props, dom = this.state.dom) => {
        const { emSize, constants, styles, theme, textSelectable, baseFontSize, renderAd } = props;

        return RNElements && RNElements.length ? RNElements.reduce((elements, element, index) => {
            const { attribs, data, tagName, parent, parentTag, children, rawChildren, nodeIndex, wrapper } = element;
            const Wrapper = wrapper === 'Text' ? TextWrapper : ViewWrapper;
            const key = `${wrapper}-${parentIndex}-${nodeIndex}-${tagName}-${index}-${parentTag}`;

            const childElements = children && children.length ? this.renderRNElements(children, wrapper, index, props) : false;


            // if (parentWrapper === 'root' && index > 1) {
            //     elements[elements.length] = renderAd()
            // }


            if (this.renderers[tagName]) {
                const customRenderer =
                    typeof this.renderers[tagName] === 'function' ?
                        this.renderers[tagName] :
                        this.renderers[tagName].renderer;

                if (!customRenderer || typeof customRenderer !== 'function') {
                    console.warn(`Custom renderer for ${tagName} supplied incorrectly. Please check out the docs.`);
                    return undefined;
                }

                // If a custom renderer is available for this tag
                elements[elements.length] = customRenderer({
                    ...props,
                    dom,
                    parent,
                    parentWrapper: wrapper,
                    parentTag,
                    nodeIndex,
                    parentIndex,
                    keyProperty: key,
                    data,
                    htmlAttribs: attribs,
                    rawChildren,
                    mappedChildren: children,
                    children: childElements,
                });
            } else {
                const extraProps = {
                    ...props,
                    dom,
                    parent,
                    parentWrapper: wrapper,
                    parentTag,
                    nodeIndex,
                    parentIndex,
                    keyProperty: key,
                    data,
                    htmlAttribs: attribs,
                    rawChildren,
                    mappedChildren: children,
                    children: childElements,
                };

                if (Wrapper === TextWrapper) extraProps.selectable = textSelectable;

                const textElement = data ? <Text key={key} {...extraProps}>{ data }</Text> : false;

                elements[elements.length] = (
                    <Wrapper key={key} {...extraProps}>
                        { textElement }
                        { childElements }
                    </Wrapper>
                );
            }

            return elements;

        }, []) : false;
    };

    render() {
        const { styles } = this.props;
        const { RNNodes } = this.state;

        return (
            <View style={styles.container} key={'contentcontainer'}>
                { RNNodes }
            </View>
        );
    }

}

export default ContentView;