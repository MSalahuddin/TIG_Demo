import Box from 'components/Box';
import React from 'react';
import TagValue from './TagValue';

const TagsValue = ({ value, onTagDelete,  ...props }) => {
    if (!value) return null;
    return (
        <Box flexDirection={"row"} maxWidth={"100%"} flexWrap={"wrap"} {...props}>
            {value.map((v, i) => (
                <TagValue
                    key={v.id}
                    value={v.name}
                    onDelete={() => onTagDelete(v, i)}
                />
            ))}
        </Box>
    )
}

export default TagsValue