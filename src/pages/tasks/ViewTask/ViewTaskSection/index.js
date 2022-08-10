import Box from "components/Box";
import Divider from "components/Divider";
import Text from "components/Text";
import { t } from "helpers/react";
import React from "react";


const ViewTaskSection = ({ display, label, children, theme, styles, divider }) => {
    return (
        t(display, (
            <>
                <Box my="15" {...styles?.container}>
                    {t(label, <Text category="s3" my="2" color={theme['grey-600']} style={{ textTransform: "uppercase" }} {...styles?.label}>
                        {label}
                    </Text>)}
                    <Box mx={-20} my="2" {...styles?.content}>
                        {children}
                    </Box>
                    {divider && <Divider mt={3} p={0} {...styles?.divider}/>}
                </Box>
            </>
        ))
    )
};


export default ViewTaskSection