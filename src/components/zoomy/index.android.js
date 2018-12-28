import PropTypes from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";

const zoomy = {
    name: "Zoomy",
    propTypes: {
        ...ViewPropTypes
    }
};

export const Zoomy = requireNativeComponent(
    "RCTZoomy",
    zoomy
);