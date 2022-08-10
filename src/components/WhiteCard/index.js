import React from 'react';
import { t } from "helpers/react";
import Text from "components/Text";
import { typography } from "styles/typography";
import Box from 'components/Box';

const WhiteCard = ({ children, header, headerProps, headerStyle, ...props }) => {
    const hstyle = { ...typography["body/medium – regular"], ...headerStyle };
    return (
        <Box backgroundColor={"#fff"} width={"100%"} {...props}>
            {t(header, <Text {...headerProps} style={ hstyle } > {header}</Text>)}
            {children}
        </Box>
    )

}

export default WhiteCard