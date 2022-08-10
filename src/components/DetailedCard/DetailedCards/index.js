
import React from 'react';
import { compact } from 'lodash-es';
import DetailedCard from '../index.js';
import Box from 'components/Box';
import { ScrollView } from 'react-native';

const DetailedCards = ({ data, styles, children }) => {
  return (
    <Box as={ScrollView} {...styles?.container}>
      {compact(data).map(({ label, content, styles: _styles }) => (
        <DetailedCard
          label={label}
          content={content}
          styles={{ ...styles, ..._styles }}
        />
      ))}
      {children}
    </Box>
  )

}

export default DetailedCards
