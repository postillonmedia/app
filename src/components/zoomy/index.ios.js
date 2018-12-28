import React, { Children, PureComponent } from 'react';


export default class Zoomy extends PureComponent {

    render = () => {
        return Children.only(this.props.children);
    };

}