import React from 'react';
import Box from 'components/Box';
import Header from 'components/Header';

const HeadedScreen = ({ actions = [], header = '',title, headerStyle, children, contentContainerProps, headerProps, ...props }) => {
    return (
        <Box flex={1} {...props}>
            <Header
                actions={actions}
                style={headerStyle}
                title={title}
                header={header}
                {...headerProps}
            />
            <Box flex={1} {...contentContainerProps}>
                {children}
            </Box>
        </Box>
    )
}

export default HeadedScreen;