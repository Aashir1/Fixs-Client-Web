import React, { createRef, Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { Box, Button, CheckBox, Grommet, Select, Text } from "grommet";

export default class Selecte extends Component {
    static propTypes = {
        theme: PropTypes.shape({})
    };

    static defaultProps = {
        theme: undefined
    };

    // state = {
    //     options: this.props.busesName,
    //     value: ""
    // };

    render() {
        const { theme } = this.props;
        const { options, value } = this.props;
        return (
            <Grommet theme={theme}>
                <Box fill align="center" justify="start">
                    <Select
                        id="select"
                        name="select"
                        placeholder="Select Bus"
                        value={value}
                        options={options}
                        onChange={({ option }) => this.props.setBusName(option)}
                    />
                </Box>
            </Grommet>
        );
    }
}