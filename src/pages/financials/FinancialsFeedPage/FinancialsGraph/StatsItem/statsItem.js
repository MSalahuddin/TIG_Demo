import React from "react";
import Box from "components/Box";
import Text from "components/Text";
import {Svg, Circle} from "react-native-svg";
import { styles } from './styles'

const StatsItem =({title,value, hasMarker = true, markerColor})=>{
    return(
        <Box style={styles.statItem}>
            <Box style={styles.statTitle}>
                {hasMarker? 
                     <Svg style={styles.markerContainer}>
                        <Circle cx="5" cy="5" r="5" fill={markerColor} />
                     </Svg> : null
                }
                <Text style={styles.statTitleText}>{title}</Text>
            </Box>
            <Text style={styles.statValueText}>{value}</Text>
        </Box>
    )
}

export default StatsItem