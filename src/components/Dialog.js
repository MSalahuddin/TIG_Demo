import React from 'react';
import styled from 'styled-components/native';
import { Layout, Icon, Text } from '@ui-kitten/components';
import Button from 'components/Button';
import GradientButton from './GradientButton';
import Modal from './Modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, ScrollView } from 'react-native';
import Box from './Box';
import { noop } from 'lodash-es';
import { chain } from 'helpers/func';

const DialogWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const DialogView = styled(Box).attrs(({ style }) => ({
  backgroundColor: "#fff",
  ...style

}))`
  border-radius: 15;
  align-items: stretch;
  justify-content: space-between;
  max-width: 78%;
  position: relative;
  shadow-opacity: 0.1;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 1};
  elevation: 5;
  top: ${() => getStatusBarHeight() * -1};
`;

const CloseButton = styled(Button)`
  position: absolute;
  left: -20;
  bottom: 5;
`;

const CloseIcon = styled(Icon)`
  margin-vertical: 5;
`;

const CenterText = styled(Text).attrs(({ style }) => ({
  ...style

}))`
  text-align: center;
`;

const Content = styled(ScrollView).attrs(({ paddingTop = 30, paddingBottom = 30, ...props}) => ({
  paddingBottom, 
  paddingTop,
  ...props
})    )``;

const ButtonsContainer = styled.View`
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
`;

const ButtonWrapper = styled.View`
  margin-top: 15;
  /* flex: 1; */
`;
const positionsToStyle = {
  center: 'center',
  bottom: 'flex-end',
  top: 'flex-start'
}

export const Buttons = ({ buttons, containerStyle, btnStyle, textStyle }) => {
  return (
    <ButtonsContainer style={containerStyle}>
      {(buttons).map(
        ({ gradient, additionalOnPress = noop, onPress, textStyle, ...btnProps }, i) => (
          <>
            {React.createElement(Button, {
              onPress,
              ...btnProps,
              textStyle
            })}
          </>
        ),
      )}
    </ButtonsContainer>
  )
}


const Dialog = ({
  visible,
  onHide,
  buttons = [],
  content,
  title,
  closeIcon,
  position = 'center',
  children,
  modalProps,
  titleProps,
  styles,
  buttonsContainerStyle
}) => {
  
  const buttonOnPressFacory = React.useCallback(
    (hide, onPress) => {
      return (...args) => {
        if (hide) {
          onHide();
        }
        if (onPress) {
          onPress(...args);
        }
      };
    },
    [onHide],
  );

  const renderedContent = content || children;

  return (
    <Modal visible={visible} onHide={onHide} animationType="fade" {...modalProps}>
      <DialogWrapper pointerEvents="box-none" style={{ justifyContent: positionsToStyle[position] }}>
        <DialogView p={10} style={styles?.view} alignItems={"center"} >
          {closeIcon ? (
            <CloseButton
              shape="circle"
              size="small"
              appearance="ghost"
              onPress={onHide}
              icon={style => (
                <CloseIcon name={closeIcon} width={26} height={26} />
              )}
              {...styles?.close}
            />
          ) : null}
          {title && <CenterText category="s1"  {...titleProps} style={{...styles?.title}}>{title}</CenterText>}
          {renderedContent && <Box maxHeight={Dimensions.get('screen').height / 2.5}>
            <Content mx={10} style={{ flexGrow: 0, ...styles?.content }} contentContainerStyle={{alignItems: "center"}} bounces={false}>
              {renderedContent && typeof renderedContent === 'string' ? (
                <CenterText category="p1" style={styles?.contentText} >{renderedContent}</CenterText>
              ) : (
                renderedContent
              )}
            </Content>
          </Box>}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            mt={1}
          >
            <Buttons containerStyle={buttonsContainerStyle} buttons={buttons.map(({ hide, ...btn }) => ({ additionalOnPress: hide && onHide, ...btn }))} />
          </Box>
        </DialogView>
      </DialogWrapper>
    </Modal>
  );
};

export default Dialog;
