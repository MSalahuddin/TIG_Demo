import React from "react";
import Box from "components/Box";
import Text from "components/Text";
import { styles } from "./styles";
import { colors } from 'styles/theme'
import StatsItem from "../StatsItem/statsItem";

const TotalValues = ({date, cashIn, cashOut, title, title1, title2}) =>{
    return(
        <Box style={styles.mainContainer}>
            <Box style={styles.titleContainer}>
                <Text style={styles.timeFrameText}>{date}</Text>
            </Box>
            <Box style={styles.statsContainer}>
                <StatsItem 
                    title={title1}
                    value={cashIn}
                    markerColor={colors['graph/in']}/>
                <StatsItem 
                    title={title2}
                    value={cashOut}
                    markerColor={colors['graph/out']}/>
                <StatsItem 
                    title={title}
                    value={cashIn-cashOut}
                    hasMarker={false}/>
            </Box>
        </Box>
    )
}

export default TotalValues