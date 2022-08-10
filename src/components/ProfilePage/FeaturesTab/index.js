import Box from 'components/Box';
import WhiteFeaturesCard from 'components/Features/WhiteFeaturesCard';
import React from 'react';
import { ScrollView } from 'react-native';
import { colors } from 'styles/theme';


export const FeaturesTab = ({ features, children }) => {
    return (
        <Box as={ScrollView} style={{ backgroundColor: colors["gray scale/5"] }}>
            <WhiteFeaturesCard
                containerProps={{ mb: 3 }}
                features={features}
                conditional
            />
            {children}
        </Box>
    )
}
export default FeaturesTab