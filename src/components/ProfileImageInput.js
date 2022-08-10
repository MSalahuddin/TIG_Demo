import React from 'react';
import Button from 'components/Button';
import Box from './Box';
import Icon from './Icon';
import ThemedGradient from './ThemedGradient';
import Avatar from './Avatar';
import { colors } from "styles/theme";
import AddFileModal from './Modals/AddFileModal';

const ProfileImageInput = ({ value, onChange, disabled, isAvatar, ...props }) => {
  const [picModal, setPicModal] = React.useState(false);
  return (
    <>
      <Box flex={1} position="relative" overflow="visible">
        <Box
          as={ThemedGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          borderRadius={100}
          p={value ? 0 : '1px'}
          m={!value ? 0 : '1px'}
          overflow="hidden">
          {(isAvatar && !value) ?
            <Box
              as={Button}
              icon={Icon('camera')}
              color={colors['gray scale/20']}
              onPress={() => setPicModal(true)}
              shape="rounded"
              px="20px"
              py="30px"
            />
            :
            <Avatar
              source={value || require('img/profile.svgpng')}
              size="giant"
              style={{ width: 95, height: 95 }}
            />}
        </Box>
        <Button
          icon={Icon(value ? 'minus' : 'plus')}
          status={value ? 'danger' : 'primary'}
          appearance={value ? 'filled' : 'outline'}
          onPress={() => value ? onChange(null) : setPicModal(true)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            paddingHorizontal: 0,
            ...(value ? {} : { backgroundColor: '#fff' }),
          }}
          disabled={disabled}
          shape="circle"
          size="tiny"
        />
      </Box>
      <AddFileModal
        onHide={() => setPicModal(false)}
        setValue={val => onChange(val?.[0])}
        visible={picModal}
      />
    </>
  );
};

export default ProfileImageInput;
