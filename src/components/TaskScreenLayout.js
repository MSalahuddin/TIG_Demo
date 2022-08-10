import React from 'react';
import Box from 'components/Box';
import {Layout} from '@ui-kitten/components';
import Loader from "components/Loader"
import {Dimensions, StatusBar, RefreshControl, Platform} from 'react-native';
import useTheme from 'hooks/useTheme';
import Header from 'components/Header';
import styled from 'styled-components/native';
import FocusedStatusBar from 'components/FocusedStatusBar';
import Animated from 'react-native-reanimated';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import SafeAreaView from './SafeAreaView';
import LazyScreen from 'utils/LazyScreen';
import { IS_SMALLER } from 'styles/responsive';

const ShadowBox = styled(Box)`
  shadow-offset: {width: 0, height: 0};
  shadow-color: #000;
  shadow-radius: 10;
  shadow-opacity: 0.3;
  elevation: 30;
`;
const TaskScreenLayout = ({
  headerProps,
  children,
  refreshing,
  onRefresh,
  isLoading,
  scrollRef,
  status = 'primary',
}) => {
  const theme = useTheme();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [scrollY] = React.useState(new Animated.Value(0));
  const [heightY] = React.useState(new Animated.Value(height * 10));
  const HeaderWrapper = Platform.OS === 'ios' ? Box : SafeAreaView;

  return (
    <Box as={Layout} flex={1} position="relative">
      <Animated.Code>
        {() =>
          Animated.call([scrollY], ([scroll]) => {
            Platform.OS === 'ios' && StatusBar.setHidden(scroll > 50, 'slide');

            Platform.OS === 'android' &&
              StatusBar.setBarStyle(
                scroll > 50 ? 'dark-content' : 'light-content',
              );
          })
        }
      </Animated.Code>

      <Animated.View
        style={{transform: [{translateY: Animated.sub(0, scrollY)}]}}>
        <Box
          // as={LinearGradient}
          // start={{x: 0, y: 0}}
          // end={{x: 1, y: 0}}
          width={width * 1.5}
          height={height * 1.5}
          borderRadius={width * 0.75}
          overflow="hidden"
          position="absolute"
          top={-height * 1.25}
          left={-width * 0.25}
          // colors={[theme[`color-${status}-500`], theme[`color-${status}-500`]]}
          backgroundColor={theme[`color-${status}-500`]}
        />
      </Animated.View>
      <Animated.View
        style={{transform: [{translateY: Animated.sub(heightY, scrollY)}]}}>
        <Box
          // as={LinearGradient}
          // start={{x: 0, y: 0}}
          // end={{x: 1, y: 0}}
          width={width}
          height={height * 1.5}
          overflow="hidden"
          position="absolute"
          bottom={100 - height * 1.5}
          // colors={[theme[`color-${status}-500`], theme[`color-${status}-500`]]}
          backgroundColor={theme[`color-${status}-500`]}
        />
      </Animated.View>
      <FocusedStatusBar barStyle="light-content" />

      <Box
        as={Animated.ScrollView}
        flex={1}
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{flexGrow: 1}}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          onRefresh ? (
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              tintColor={theme['background-basic-color-1']}
              colors={[theme['color-primary-500']]}
            />
          ) : null
        }
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {y: scrollY},
              contentSize: {height: heightY},
            },
          },
        ])}>
        <HeaderWrapper forceInset={{top: 'always'}}>
          <Header {...headerProps} transparent status="control" />
        </HeaderWrapper>
        <Box
          pt={getStatusBarHeight()}
          pb={30}
          px={!IS_SMALLER ? 24: 3}
          flex={1}
          onLayout={({nativeEvent: {layout}}) =>
            requestAnimationFrame(() => heightY.setValue(layout.height + 60))
          }>
          <ShadowBox
            flex={1}
            as={Layout}
            borderRadius={5}
            minHeight={height * 0.65}>
            <LazyScreen>
              <Loader isLoading={isLoading}  />
              {children}
            </LazyScreen>
          </ShadowBox>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskScreenLayout;
