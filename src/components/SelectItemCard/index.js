import React from 'react';
import { RadioCircle } from 'components/TabListSelect/TabListButton';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';

const SelectItemCard = ({ isSelected,  ...props }) => {
    return (
        <SelectButtonInputValue styles={styles} {...props}>
            <RadioCircle isChecked={isSelected} />
        </SelectButtonInputValue>
    )
}

const styles = { container: { justifyContent: "space-between", marginBottom: "3%" }, image: { borderRadius: 25 } }

export default SelectItemCard;