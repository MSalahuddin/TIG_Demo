import React from 'react';
import {Layout} from '@ui-kitten/components';
import styled from 'styled-components/native';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {Image} from 'react-native';
import Box from 'components/Box';

const NavShadow = styled(BottomNavigation)`
  elevation: 25;
  shadow-opacity: 0.1;
  shadow-radius: 2;
  shadow-color: #000;
  shadow-offset: {height: 1, width: 0};
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const BottomTab = ({state, descriptors, navigation}) => {
  const dblClickRefs = React.useRef({});
  const onSelect = React.useCallback(
    index => {
      const now = new Date().getTime();
      const delta = now - (dblClickRefs.current?.[index] ?? 0);
      const selectedRoute = state?.routes[index];
      dblClickRefs.current[index] = now;

      if (delta < 300) {
        return navigation.navigate(
          selectedRoute?.state?.routeNames?.[0] ?? selectedRoute?.name,
        );
      }
      navigation.navigate(selectedRoute.name);
    },
    [navigation, state],
  );

  const TabProxy = React.useCallback(
    props => {
      return (
        <>
          {state.routes
            .map((route, index) => {
              const {options} = descriptors[route.key];
              if (options.hidden) {
                return null;
              }
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const selected = index === state.index;

              let iconImage =
                selected && options.tabBarIconActive
                  ? options.tabBarIconActive
                  : options.tabBarIcon;
              let icon = options.icon;
              if (iconImage) {
                icon = ({tintColor, ...style}) => (
                  <Box>
                    <Image
                      source={iconImage}
                      resizeMode="contain"
                      style={style}
                    />
                  </Box>
                );
              }

              return (
                <BottomNavigationTab
                  key={route.key}
                  selected={selected}
                  onSelect={() => onSelect(index)}
                  title={label.toUpperCase()}
                  style={props.style}
                  icon={icon}
                />
              );
            })
            .filter(tab => !!tab)}
        </>
      );
    },
    [descriptors, onSelect, state.index, state.routes],
  );

  return (
    <SafeAreaView>
      <NavShadow
        appearance="noIndicator"
        selectedIndex={state.index}
        // onSelect={onSelect}
      >
        <TabProxy />
      </NavShadow>
    </SafeAreaView>
  );
};

export default BottomTab;