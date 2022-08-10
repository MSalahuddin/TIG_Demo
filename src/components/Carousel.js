import React from 'react';
import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';
import { Layout, ViewPager } from '@ui-kitten/components';
import { Image as RNImage } from 'react-native';
import Box from './Box';
import useTheme from 'hooks/useTheme';
import ThemedGradient from './ThemedGradient';

const Slider = styled(ViewPager)`
  flex: 1;
`;

const ImageSlider = styled(Layout)`
  flex: 2;
`;

const Image = styled(RNImage)`
  flex: 1;
  width: 100%;
  height: auto;
`;

const Dots = styled(Layout)`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  margin-top: 10;
  width: 100%;
  flex-direction: row;
`;

const Dot = styled(Animated.View)`
  margin-horizontal: ${({ middle }) => (middle ? 7 : 0)};

  ${({ active }) =>
    !active
      ? css`
          border-radius: 7;
          width: 7;
          height: 7;
          background-color: #cfd8dc;
        `
      : css`
          border-radius: 11;
          width: 11;
          height: 11;
          background-color: #91a4ad;
        `}
`;

const Carousel = ({ slides, style }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dotAnim] = React.useState(new Animated.Value(0));
  const prevSelected = React.useRef(0);

  React.useEffect(() => {
    Animated.timing(dotAnim, {
      toValue: selectedIndex,
      duration: 250,
    }).start();
    prevSelected.current = selectedIndex;
  }, [dotAnim, selectedIndex]);

  const dotAnimations = slides.map((s, index) => {
    let inputRange = [prevSelected.current, selectedIndex];
    if (inputRange[0] > inputRange[1]) {
      inputRange = inputRange.reverse();
    }
    if (index === prevSelected.current) {
      const size = dotAnim.interpolate({
        inputRange,
        outputRange: prevSelected.current > selectedIndex ? [7, 11] : [11, 7],
      });

      const color = dotAnim.interpolate({
        inputRange,
        outputRange:
          prevSelected.current > selectedIndex
            ? ['#CFD8DC', '#91A4AD']
            : ['#91A4AD', '#CFD8DC'],
      });
      return {
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
      };
    } else if (index === selectedIndex) {
      const size = dotAnim.interpolate({
        inputRange,
        outputRange: prevSelected.current > selectedIndex ? [11, 7] : [7, 11],
      });
      const color = dotAnim.interpolate({
        inputRange,
        outputRange:
          prevSelected.current > selectedIndex
            ? ['#91A4AD', '#CFD8DC']
            : ['#CFD8DC', '#91A4AD'],
      });
      return {
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
      };
    }
    return {};
  });
  const theme = useTheme();

  return (
    <Layout style={style}>
      <Slider selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        {slides.map((slide, index) => (
          <React.Fragment key={index}>
            <ImageSlider>
              <Box flex={1}>
                <Box as={Image} source={slide.image} />
                <Box
                  as={ThemedGradient}
                  flex={1}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0.25, 0.61, 1]}
                  left={0}
                  top={0}
                  width="100%"
                  height="100%"
                  opacity={0.5}
                  colors={[
                    theme['color-primary-default'],
                    theme['color-primary3-transparent-500'],
                    theme['color-primary2-transparent-600'],
                  ]}
                  position="absolute"
                />
              </Box>
            </ImageSlider>
            <Slider as={Layout}>
              <Dots>
                {slides.map((s, index) => (
                  <Dot
                    key={index}
                    active={index === selectedIndex}
                    middle={index > 0 && index < slides.length - 1}
                    style={dotAnimations[index]}
                  />
                ))}
              </Dots>
              {slide.content}
            </Slider>
          </React.Fragment>
        ))}
      </Slider>
    </Layout>
  );
};

export default Carousel;
