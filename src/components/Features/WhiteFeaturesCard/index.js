import Features from "../index";
import React from "react";
import { styles } from "./styles";
import WhiteCard from "components/WhiteCard";


const WhiteFeaturesCard = ({ features, containerProps, ...props }) => {
    return (
        <WhiteCard headerStyle={styles.cardHeader} {...containerProps}>
            <Features
                features={features}
                styles={styles.features}
                {...props}
            />
        </WhiteCard>
    )
};

export default WhiteFeaturesCard;