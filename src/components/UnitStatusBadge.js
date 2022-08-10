import React from 'react';
import {UNIT_STATUS} from 'constants/enums';
import Box from './Box';
import useTheme from 'hooks/useTheme';
import Text from './Text';

const statusColors = {
  [UNIT_STATUS.VACANT]: 'color-primary3-500',
  [UNIT_STATUS.OCCUPIED]: 'color-primary-500',
  [UNIT_STATUS.LISTED]: 'color-primary2-500',
};

const UnitStatusBadge = ({status, textProps, ...props}) => {
  const theme = useTheme();

  return (
    <Box
      borderRadius={18}
      backgroundColor={theme[statusColors[status]]}
      py="1px"
      {...props}>
      <Text
        category="s3"
        transform="uppercase"
        // fontSize={10}
        status="control"
        textAlign="center"
        {...textProps}>
        {Object.keys(UNIT_STATUS)
          .filter(k => UNIT_STATUS[k] === status)
          .map(k =>
            k
              .split('_')
              .map(w => w.toUpperCase())
              .join(' '),
          )}
      </Text>
    </Box>
  );
};

export default UnitStatusBadge;
