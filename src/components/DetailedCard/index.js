import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Box from 'components/Box';
import { t } from 'helpers/react';
import FastImage from 'react-native-fast-image';

const DetailedCard = ({ styles, label, content }) => {
  return (
    <Box flex={1} style={[styles?.row]} maxWidth={'100%'}>
      <Box style={[styles?.headerRow]}>
        {t(label,
          <Text style={[styles?.label]}>{label}</Text>,
        )}
        {t(content.buttonText,
          <TouchableOpacity onPress={content?.onPress}>
            <Box style={[styles?.contentButton]}>
              <Text style={[styles?.contentButtonText]}>
                {content.buttonText}
              </Text>
            </Box>
          </TouchableOpacity>,
        )}
      </Box>
      <Box style={[styles?.contentRow]}>
        {t(content.uri,
          <FastImage source={{ uri: content.uri || "" }} style={[styles?.contentImage]} />,
        )}
        <Box>
          <Text style={[styles?.contentText]}>
            {content.text}
          </Text>
          {t(content.subText,
            <Text style={[styles?.contentSubText]}>
              {content.subText}
            </Text>,
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailedCard;
