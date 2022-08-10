import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled as ukStyled } from '@ui-kitten/components';
import styled from 'styled-components/native';
import Box from './Box';
import Text from './Text';
import useTheme from 'hooks/useTheme';
import Animated, { Easing } from 'react-native-reanimated';

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1];
  }
  throw new Error('Bad Hex');
}

export const SwitchBackground = styled(Animated.View)`
  shadow-opacity: 0.3;
  shadow-radius: 5;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  elevation: 2;
  z-index: 1;
  position: absolute;
  top: -1;
  /* width: ${({ count }) => `${100 / count}%`}; */
  transform: ${({ count, value }) => `translateX(${(value === 0 || value === false) ? '-1px' : (value === (count - 1)) ? '1px' : '0px'})`};
`;

export const SubSwitch = styled(Box)`
  /* flex: 1; */
  align-items: center;
  justify-content: center;  
  z-index: 2;
  elevation: 3;
`;

const MultiTextSwitch = ({
  style,
  themedStyle,
  textStyle,
  value,
  onSelect,
  shape,
  options = [],
  ...props
}) => {
  const theme = useTheme();
  const [switchValue, setSwitchValue] = React.useState(value || false);
  const [switchAnimatedValue] = React.useState(
    new Animated.Value(+switchValue),
  );

  React.useEffect(() => {
    if (value !== undefined && value !== switchValue) {
      setSwitchValue(+value);
    }
  }, [value, switchValue]);

  React.useEffect(() => {
    Animated.timing(switchAnimatedValue, {
      toValue: +switchValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
    /* eslint-disable-next-line */
  }, [switchValue]);

  const onSelectProxy = React.useCallback(
    i => {
      setSwitchValue(i);
      if (onSelect) {
        onSelect(options[i], i);
      }
    },
    [onSelect, options],
  );

  const componentStyles = React.useMemo(() => {
    const {
      textColor,
      textFontFamily,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textMarginHorizontal,
      switchTextColor,
      switchBackgroundColor,
      paddingVertical,
      paddingHorizontal,
      ...containerParameters
    } = themedStyle;

    return {
      container: containerParameters,
      switchContainer: {
        backgroundColor: switchBackgroundColor,
        paddingVertical,
        paddingHorizontal,
      },
      text: {
        color: textColor,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
      },
    };
  }, [themedStyle]);

  const animatedStyles = React.useMemo(() => {
    const optionWeight = i =>
      options
        .filter((o, i2) => i2 < i)
        .reduce((sum, o2) => sum + o2.text.length + 8, 0);
    const totalWeights = optionWeight(options.length);

    return {
      textColor: index =>
        Animated.color(
          ...[0, 1, 2].map(c =>
            Animated.round(
              Animated.interpolate(switchAnimatedValue, {
                inputRange: [...Array(options.length).keys()],
                outputRange: options.map(
                  (o, i) =>
                    hexToRgbA(
                      index === i
                        ? theme['color-control-default']
                        : '#131F1E',
                    )[c],
                ),
              }),
            ),
          ),
        ),
      backgroundColor: Animated.color(
        ...[0, 1, 2].map(c =>
          Animated.round(
            Animated.interpolate(switchAnimatedValue, {
              inputRange: [...Array(options.length).keys()],
              outputRange: options.map(
                o =>
                  hexToRgbA(
                    o.color || theme["primary/50"],
                  )[c],
              ),
            }),
          ),
        ),
      ),
      shadowColor:
        options?.[switchValue]?.color ||
        theme["primary/50"],
      left: Animated.concat(
        Animated.interpolate(switchAnimatedValue, {
          inputRange: [...Array(options.length).keys()],
          outputRange: options.map(
            (o, i) => (optionWeight(i) * 100) / totalWeights,
          ),
        }),
        '%',
      ),
      width: Animated.concat(
        Animated.interpolate(switchAnimatedValue, {
          inputRange: [...Array(options.length).keys()],
          outputRange: options.map(
            (o, i) => ((o.text.length + 8) * 100) / totalWeights,
          ),
        }),
        '%',
      ),
    };
  }, [options, switchAnimatedValue, switchValue, theme]);
  return (
    <Box
      flexDirection="row"
      position="relative"
      style={[componentStyles.container, style]}>
      <SwitchBackground
        count={options.length}
        value={switchValue}
        style={[
          componentStyles.container,
          componentStyles.switchContainer,
          {
            borderWidth: 0,
            backgroundColor: theme["primary/50"],
            shadowColor: animatedStyles.shadowColor,
            left: animatedStyles.left,
            width: animatedStyles.width,
          },
        ]}
      />
      {options.map((option, i) => (
        <SubSwitch
          flex={option.text.length + 8}
          as={TouchableOpacity}
          activeOpacity={1}
          onPress={() => onSelectProxy(i)}
          key={option.key || i}>
          <Box flex={1} alignItems="stretch" justifyContent="center">
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              textAlign="center"
              as={Animated.Text}
              style={[
                componentStyles.text,
                i === switchValue
                  ? componentStyles.onSwitchText
                  : componentStyles.offSwitchText,
                textStyle,
                {
                  color: animatedStyles.textColor(i),
                  fontWeight: "400",
                  fontSize: 14
                },
              ]}>
              {option.text}
            </Text>
          </Box>
        </SubSwitch>
      ))}
    </Box>
  );
};

MultiTextSwitch.styledComponentName = 'TextSwitch';

export default ukStyled(MultiTextSwitch);
