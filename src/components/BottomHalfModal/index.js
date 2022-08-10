import React from 'react';
import styled from 'styled-components/native';
import { Layout } from '@ui-kitten/components';
import Button from 'components/Button';
import GradientButton from '../GradientButton';
import Modal from '../Modal';
import useTheme from 'hooks/useTheme';
import Text from '../Text';
import SafeAreaView from 'components/SafeAreaView';
import { t } from 'helpers/react';
import { TouchableOpacity } from 'react-native';
import Box from '../Box';
import StyledLine from '../StyledLine';
import { styles } from './styles';
import { noop } from 'lodash';
import { FlingGestureHandler } from 'react-native-gesture-handler';
import { Directions } from 'react-native-gesture-handler/GestureHandler';

const DialogWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  /* top: 0; */
  right: 0;
  bottom: 0;
`;

const DialogView = styled(Layout)`
  border-top-left-radius: 18;
  border-top-right-radius: 18;
  padding-bottom: 20;
  position: relative;
  width: 100%;
  shadow-opacity: 0.1;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 1};
  elevation: 5;
`;

const CenterText = styled(Text)`
  text-align: center;
  padding-top: 20;
`;

const Content = styled.View`
  margin-top: 7;
  padding-bottom: 10;
`;

const Buttons = styled.View`
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
`;

const ButtonWrapper = styled.View`
  margin-top: 15;
  /* flex: 1; */
`;

const BottomHalfModal = ({
  visible,
  onHide,
  buttons,
  content,
  title,
  displayDone = true,
  contentContainerProps,
  children,
  headerRight,
  titleAppender,
  onSwipeUp = noop,
  styles: _styles, 
  onDone = onHide,
  ...props
}) => {
  const theme = useTheme();

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

  const realContent = content || children;

  return (
    <Modal visible={visible} blurback={true} onHide={onHide} animationType="slide" {...props} >
      <DialogWrapper>
        <DialogView>
          <FlingGestureHandler
            direction={Directions.DOWN}
            onHandlerStateChange={onHide}>
            <FlingGestureHandler
              direction={Directions.UP}
              onHandlerStateChange={onSwipeUp}>
              <Box>
                <StyledLine style={styles.styledLineTop} />
                <Box style={[styles.headerContainer, _styles?.headerContainer]}>
                  {t(displayDone, <TouchableOpacity onPress={onDone} style={styles.doneContainer}>
                    <Text style={styles.doneTxt}>Done</Text>
                  </TouchableOpacity>)}
                  <CenterText style={[styles.headerTxt, _styles?.headerTxt]} category="p1">
                    {title}
                  </CenterText>
                  <Box style={styles.rightAction}>
                    {headerRight}
                  </Box>
                </Box>
              </Box>
            </FlingGestureHandler>
          </FlingGestureHandler>

          {titleAppender}
          <SafeAreaView px={20} pb="3" {...contentContainerProps}>
            <Content>
              {realContent && typeof realContent === 'string' ? (
                <CenterText category="p1">{realContent}</CenterText>
              ) : (
                realContent
              )}
            </Content>
            <Buttons>
              {(buttons || []).map(
                ({ gradient, hide, onPress, ...btnProps }, i) => (
                  <ButtonWrapper key={i}>
                    {React.createElement(Button, {
                      onPress: buttonOnPressFacory(hide, onPress),
                      ...btnProps,
                    })}
                  </ButtonWrapper>
                ),
              )}
            </Buttons>
          </SafeAreaView>
        </DialogView>
      </DialogWrapper>
    </Modal>
  );
};

export default BottomHalfModal;
