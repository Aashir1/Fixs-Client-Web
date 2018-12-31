import React, { Component } from "react";
import { Box, Button, Calendar, Grommet, Heading, Text } from "grommet";
import { grommet } from "grommet/themes";


let SimpleCalender = (props) => {
    return (
        <Grommet theme={grommet}>
            <Box align="center" pad="large">
                <Calendar
                    date={props.date}
                    onSelect={props.onSelect}
                    size="small"
                    bounds={["2015-09-08", "2019-12-31"]}
                />
            </Box>
        </Grommet>
    );
}

export default SimpleCalender;