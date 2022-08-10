import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import Box from 'components/Box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from 'components/Text';
import Animated from 'react-native-reanimated';
import { Layout } from '@ui-kitten/components';
import { chain } from 'helpers/func';
import { colors } from 'styles/theme';

const BarBox = styled(Animated.View)`
  position: absolute;
  left:${({isPointTab})=>isPointTab? 25:0};
  top: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
`;

const BarText = styled(Text)`
  color: ${({ active, absolute, theme }) =>
    active || absolute ? theme['color-primary-500'] : '#CFD8DC'};
  text-transform: uppercase;
`;

const Dot = styled(Box)`
  width: 5;
  height: 5;
  background-color: ${({ theme }) => theme['color-primary-500']};
  border-radius: 5;
  position: absolute;
  bottom: 5;
`;

const TabIndexView = styled.View`
  background-color: ${({ theme, dark }) => dark ? theme['color-primary-500'] : colors['gray scale/10']};
  border-radius: 25;
  padding-horizontal:7px;
  bottom:2;
  margin-right:5.5;

`;
const PointText = styled(Text)`
color: ${({ dark }) => dark ? '#FFFFFF' :colors['gray scale/90']};

`;

const TopTab = React.forwardRef(
  ({ isPointTab = false, state, descriptors, navigation, position, children, onPress, onRouteChange }, ref) => {
    React.useImperativeHandle(
      ref,
      () => ({ position, route: state.routeNames?.[state.index] }),
      [position, state.index, state.routeNames],
    );

    const onSelect = React.useCallback(
      index => {
        const selectedTabRoute = state?.routeNames[index];
        navigation.navigate(selectedTabRoute);
      },
      [navigation, state],
    );

    useEffect(()=> onRouteChange && onRouteChange(state), [state?.index])
    const tabSize = 100 / state.routes.length;

    const [tabSizes, setTabSizes] = React.useState(
      [...Array(state.routes.length).keys()].map(() => null),
    );

    const setTabSize = React.useCallback(i => {
      return event => {
        const width = event.nativeEvent.layout.width;
        if (width) {
          setTabSizes(sizes => [
            ...sizes.slice(0, i),
            width,
            ...sizes.slice(i + 1),
          ]);
        }
      };
    }, []);

    return (
      <Box
        as={Layout}
        flexDirection="row"
        alignItems="center"
        justifyContent={isPointTab ? "center" : "space-between"}
        mx="5px">
        <Box flexDirection="row" alignItems="center">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;
            const labelIndex = options.index ?? ''
            return (
              <Box
                as={TouchableOpacity}
                key={route.key}
                px={10}
                py={10}
                flexDirection={isPointTab ? "row" : "column"}
                justifyContent={isPointTab?"space-between":'flex-start'}
                onLayout={setTabSize(index)}
                activeOpacity={0.6}
                onPress={chain([() => onSelect(index), onPress && (() => onPress(route))])}>
                {isPointTab &&<TabIndexView dark={state?.index === index ? true : false}>
                  <PointText dark={state?.index === index ? true : false} category='s3' fontSize={10}>{labelIndex}</PointText>
                </TabIndexView>}
                <BarText category="s3" fontSize={18}>
                  {label}
                </BarText>
                <BarBox
                isPointTab={isPointTab}
                  style={{
                    opacity:
                      state.routes.length > 1
                        ? Animated.interpolate(position, {
                          inputRange: [...Array(state.routes.length).keys()],
                          outputRange: [
                            ...Array(state.routes.length).keys(),
                          ].map(i => (i === index ? 1 : 0)),
                        })
                        : 1,
                  }}>
                  <BarText category="s3" fontSize={18}  absolute>
                    {label}
                  </BarText>
                </BarBox>
              </Box>
            );
          })}
          {!isPointTab && <Dot
            as={Animated.View}
            style={{
              left:
                state.routes.length > 1
                  ? Animated.interpolate(position, {
                    inputRange: [...Array(state.routes.length).keys()],
                    outputRange: [
                      ...Array(state.routes.length).keys(),
                    ].map(i =>
                      tabSizes.every(a => !!a)
                        ? tabSizes.reduce(
                          (acc, curr, idx) =>
                            acc +
                            (idx === i ? curr / 2 : idx < i ? curr : 0),
                          0,
                        )
                        : (0.5 + i) * tabSize,
                    ),
                  })
                  : tabSizes[0] / 2,
              opacity: +tabSizes.every(a => !!a),
            }}
          />}
        </Box>
        {children}
      </Box>
    );
  },
);

export default TopTab;
