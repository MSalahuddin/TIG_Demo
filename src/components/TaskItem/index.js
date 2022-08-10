import React from 'react';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import Text from 'components/Text';
import { Icon, Layout } from '@ui-kitten/components';
import { TouchableOpacity, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import runTiming from 'animations/timing';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Avatar from 'components/Avatar';
import format from 'date-fns/format';
import { stringifyEnumValue, TASK_TYPES } from 'constants/enums';
import { t } from 'helpers/react';
import { styles } from "./styles";
import SwipeableButton from './SwipeableButton';
import { curveCardinalClosed } from 'd3-shape';
import { typography } from 'styles/typography';
import { usaDateFormat } from 'constants/dateFormat';

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

const TaskItem = ({
  id,
  title,
  otherUsers = [],
  themeColor,
  initialChecked,
  value = initialChecked,
  onPress,
  onCheck,
  onUnCheck,
  onRemove,
  building,
  rightButton,
  subtitle,
  timestamp,
  animateCheck = false,
  ...props
}) => {
  const theme = useTheme();
  const iconRef = React.useRef();
  const [checked, setChecked] = React.useState(!!value);
  const [checkedFinal, setCheckedFinal] = React.useState(true);
  const [clock] = React.useState(new Animated.Clock());
  const [checkAnimatedValue, setCheckAnimatedValue] = React.useState(
    new Animated.Value(value ? 1 : 0),
  );
  const [removeAnimatedValue, setRemoveAnimatedValue] = React.useState(
    new Animated.Value(0),
  );
  const onCheckProxy = React.useCallback(() => {
    setCheckedFinal(false);
    const checkValue = checked;
    if (animateCheck) {
      setCheckAnimatedValue(
        Platform.OS === 'android'
          ? new Animated.Value(1 - +checked)
          : runTiming(clock, +checked, 1 - +checked, 500, () =>
            setChecked(!checked),
          ),
      );
    }
    (checkValue ? onUnCheck(id) : onCheck(id))
      ?.then(() => {
        setCheckedFinal(true);
      })
      ?.catch(err => {
        if (animateCheck) { 
          setCheckedFinal(true);
          setCheckAnimatedValue(
            Platform.OS === 'android'
              ? new Animated.Value(checkValue)
              : runTiming(clock, 1 - +checkValue, checkValue, 500, () =>
                setChecked(checkValue),
              ),
          );
        }
        console.log(err);
      });
  }, [checked, clock, id, onCheck, onUnCheck]);

  const onRemoveProxy = React.useCallback(
    callback => {
      setRemoveAnimatedValue(
        Platform.OS === 'android'
          ? new Animated.Value(1)
          : runTiming(
            new Animated.Clock(),
            0,
            1,
            500,
            () => callback && callback?.(id),
          ),
      );
    },
    [id],
  );

  const handleSwipablePress = React.useCallback(() => {
    setCheckedFinal(false);
    rightButton?.onPress(id)
      ?.then(() => {
        setCheckedFinal(true);
        onRemoveProxy(() => null);
      })
      ?.catch(err => {
        setCheckedFinal(true);
        console.log(err);
      });
  }, [id, rightButton, onRemoveProxy]);

  const renderRightButton = React.useCallback(
    (progress) => {
      return <SwipeableButton onPress={handleSwipablePress} theme={theme} progress={progress} {...rightButton} onPress={handleSwipablePress} />
    },
    [handleSwipablePress, rightButton],
  );

  const animatedStyles = React.useMemo(
    () => ({
      strokeWidth: Animated.concat(
        Animated.multiply(100, checkAnimatedValue),
        '%',
      ),
      textOpacity: Animated.interpolate(checkAnimatedValue, {
        inputRange: [0, 1],
        outputRange: initialChecked ? [0.3, 1] : [1, 0.3],
      }),
      checkScale: Animated.interpolate(checkAnimatedValue, {
        inputRange: [0, 1],
        outputRange: [0.01, 1],
      }),
      removeScale: Animated.interpolate(checkAnimatedValue, {
        inputRange: [0, 1],
        outputRange: initialChecked ? [1, 0.01] : [0.01, 1],
      }),
      color: Animated.color(
        ...[0, 1, 2].map(h =>
          Animated.round(
            Animated.interpolate(checkAnimatedValue, {
              inputRange: [0, 1],
              outputRange: initialChecked
                ? [
                  hexToRgbA(theme['grey-200'])[h],
                  hexToRgbA(theme[themeColor])[h],
                ]
                : [
                  hexToRgbA(theme[themeColor])[h],
                  hexToRgbA(theme['grey-200'])[h],
                ],
            }),
          ),
        ),
      ),
      usersScale: Animated.interpolate(checkAnimatedValue, {
        inputRange: [0, 1],
        outputRange: !initialChecked ? [1, 0.01] : [0.01, 1],
      }),
      translateX: Animated.interpolate(removeAnimatedValue, {
        inputRange: [0, 1],
        outputRange: [0, -600],
      }),
      scaleY: Animated.interpolate(removeAnimatedValue, {
        inputRange: [0, 1],
        outputRange: [1, 0.01],
      }),
      marginBottom: Animated.interpolate(removeAnimatedValue, {
        inputRange: [0, 1],
        outputRange: [0, -100],
      }),
    }),
    [
      checkAnimatedValue,
      initialChecked,
      removeAnimatedValue,
      theme,
      themeColor,
    ],
  );

  return (
    <Box
      as={Animated.View}
      pointerEvents={checkedFinal ? 'auto' : 'none'}
      style={{
        transform: [
          { translateX: animatedStyles.translateX },
          { scaleY: animatedStyles.scaleY },
        ],
        marginBottom: animatedStyles.marginBottom,
      }}>
      <Swipeable
        friction={2}
        rightThreshold={40}
        overshootRight={false}
        renderRightActions={rightButton ? renderRightButton : null}>
        <TouchableOpacity
          activeOpacity={onPress ? 0.8 : 1}
          onPress={onPress}
          disabled={!checkedFinal}>
          <Box
            as={Layout}
            flexDirection="row"
            borderColor={theme['grey-0']}
            borderRadius={4}
            alignItems="center"
            py="20"
            pl="2"
            my="1"
            mx="3"
            {...props}>
            {onCheck || onUnCheck ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onCheckProxy}
                disabled={!checkedFinal}>
                <Box
                  as={Animated.View}
                  borderWidth={2}
                  borderRadius={12}
                  width={24}
                  height={24}
                  mx="3"
                  position="relative"
                  overflow="hidden"
                  style={{
                    borderColor: animatedStyles.color,
                  }}>
                  <Box
                    as={Animated.View}
                    position="absolute"
                    left={-2}
                    top={-2}
                    right={0}
                    bottom={0}
                    overflow="hidden"
                    width={24}
                    height={24}
                    borderRadius={12}
                    style={{
                      backgroundColor: animatedStyles.color,
                      transform: [
                        {
                          scaleX: animatedStyles.checkScale,
                        },
                        {
                          scaleY: animatedStyles.checkScale,
                        },
                      ],
                    }}>
                    <Icon
                      name="checkmark"
                      ref={iconRef}
                      width={24}
                      height={24}
                      tintColor={theme['background-basic-color-1']}
                    />
                  </Box>
                </Box>
              </TouchableOpacity>
            ) : (
              <Box ml="3" />
            )}
            <Box flex={1} flexDirection={"column"}>
              <Box
                as={Animated.View}
                flex={1}
                flexDirection={"row"}
                position="relative"
                alignItems={"center"}
                style={{
                  opacity: animatedStyles.textOpacity,
                }}>
                {t(props.taskType, (
                  <Box
                    alignSelf="flex-start"
                    px="2"
                    my="1"
                    mr="1"
                    borderRadius={12}
                    borderWidth={1}
                    borderColor={theme['grey-300']}
                  >
                    <Text style={styles.categoryText} color={theme['grey-300']} >{stringifyEnumValue(TASK_TYPES, props.taskType)}</Text>
                  </Box>

                ))}
                <Text
                  flex={1}
                  category={subtitle ? 'p2' : 'p1'}
                  // color
                  style={typography["body/medium – regular"]}
                  numberOfLines={1}

                >
                  {title}
                </Text>
              </Box>
              {t(building?.address, (
                <Box mt={-1} mx={1}>
                  <Text color={theme['grey-300']} mt={0} fontSize={14} >{building?.address}</Text>
                </Box>
              ))}
            </Box>

            {/* <Box
                as={Animated.View}
                position="absolute"
                left={0}
                right={0}
                height={1}
                top="50%"
                backgroundColor={theme['text-basic-color']}
                style={{
                  width: animatedStyles.strokeWidth,
                }}
              /> */}
            {/* {!checkedFinal ? (
              <Box px="3">
                <Spinner size="small" status={themeColor.split('-')[1]} />
              </Box>
            ) : null} */}

            <Animated.View
              style={{
                transform: [
                  {
                    scaleX: animatedStyles.usersScale,
                  },
                  {
                    scaleY: animatedStyles.usersScale,
                  },
                ],
              }}>
              <Box flexDirection="row" height={20} alignItems="center" mr={-24}>
                {(otherUsers ?? []).map((user, i) => (
                  <Avatar
                    key={user.id}
                    source={
                      user.picture
                        ? { uri: user.picture }
                        : require('img/profile.svgpng')
                    }
                    size="small"
                    style={{
                      right: (otherUsers.length - i - 1) * -16,
                    }}
                  />
                ))}
              </Box>
            </Animated.View>
            {onRemove ? (
              <Box
                as={Animated.View}
                backgroundColor="transparent"
                px="3"
                style={{
                  transform: [
                    {
                      scaleX: animatedStyles.removeScale,
                    },
                    {
                      scaleY: animatedStyles.removeScale,
                    },
                  ],
                }}>
                <TouchableOpacity
                  onPress={() => onRemoveProxy(onRemove)}
                  activeOpacity={0.7}
                  disabled={!checkedFinal}>
                  <Icon
                    name="close-circle"
                    width={18}
                    height={18}
                    tintColor={theme['grey-200']}
                  />
                </TouchableOpacity>
              </Box>
            ) : (
              <Box px="3">
                {timestamp ? (
                  <Text category="c1" color={theme['grey-300']}>
                    {format(new Date(timestamp), usaDateFormat)}
                  </Text>
                ) : null}
              </Box>
            )}

            <Box
              as={Animated.View}
              width={4}
              height="80%"
              mr="-2px"
              ml="8px"
              style={{ backgroundColor: animatedStyles.color }}
            />
          </Box>
        </TouchableOpacity>
      </Swipeable>
    </Box>
  );
};

export default TaskItem;
