import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, { ScrollView } from 'react-native';


export class ControlsScrollView extends PureComponent {

    static propTypes = {
        ...ScrollView.propTypes,

        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ]),

        initial: PropTypes.bool,

        onEndReachedThreshold: PropTypes.number,
        onControlsVisibilityChange: PropTypes.func,
    };

    static defaultProps = {
        initial: true,

        scrollEventThrottle: 16,
        onEndReachedThreshold: 100,
    };

    _listViewOffset = 0;
    _listViewHeight = 0;
    _listViewContentHeight = 0;
    _listViewControlsVisible = false;

    constructor(props) {
        super(props);

        this._listViewControlsVisible = props.initial;
    }

    _onLayout = (event) => {
        const { onLayout } = this.props;
        const { height } = event.nativeEvent.layout;

        this._listViewHeight = height;

        onLayout && onLayout(event);
    };

    _onContentSizeChange = (contentWidth, contentHeight) => {
        const { onContentSizeChange } = this.props;

        this._listViewContentHeight = contentHeight;

        onContentSizeChange && onContentSizeChange(contentWidth, contentHeight);
    };

    _onScroll = (event) => {
        const { onControlsVisibilityChange, onEndReachedThreshold, onScroll } = this.props;

        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const limit = this._listViewContentHeight - this._listViewHeight;
        const offset = event.nativeEvent.contentOffset.y;
        const currentOffset = (offset > limit) ? limit : offset;

        if (this._listViewHeight + offset >= this._listViewContentHeight - onEndReachedThreshold) {
            this._listViewControlsVisible = true;
            onControlsVisibilityChange && onControlsVisibilityChange(true);
        } else {
            const direction = (currentOffset > 0 && currentOffset >= this._listViewOffset) ? 'down' : 'up';

            // If the user is scrolling down (and the action-button is still visible) hide it
            const controlsVisible = direction === 'up';
            if (controlsVisible !== this._listViewControlsVisible) {
                this._listViewControlsVisible = controlsVisible;
                onControlsVisibilityChange && onControlsVisibilityChange(controlsVisible);
            }
        }

        // Update your scroll position
        this._listViewOffset = currentOffset;

        onScroll && onScroll(event);
    };

    render() {
        const { children } = this.props;

        return (
            <ScrollView {...this.props} onScroll={this._onScroll} onContentSizeChange={this._onContentSizeChange} onLayout={this._onLayout}>
                {children}
            </ScrollView>
        );

    }
}


export default ControlsScrollView;