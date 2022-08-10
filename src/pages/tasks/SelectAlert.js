import React from 'react';
import Box from 'components/Box';
import {Layout, Radio} from '@ui-kitten/components';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import Text from 'components/Text';
import {ScrollView} from 'react-native';
import GradientButton from 'components/GradientButton';
import useTheme from 'hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import {stringifyEnumKey, EVENT_REPEATS, EVENT_ALERTS} from 'constants/enums';
import Button from 'components/Button';

const stripSeconds = date => {
  const d = new Date(date);
  d.setMilliseconds(0);
  d.setSeconds(0);
  return d;
};

const SelectAlert = ({navigation, route}) => {
  const [endRepeat, setEndRepeat] = React.useState(route?.params?.endRepeat);
  const [alert, setAlert] = React.useState(
    route.params?.value ?? EVENT_ALERTS.NONE,
  );
  const theme = useTheme();

  const onSelect = React.useCallback(() => {
    route.params?.onSelect?.(alert);
    navigation.goBack();
  }, [alert, navigation, route.params]);

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              onPress: () => navigation.goBack(),
              left: true,
            },
          ]}
          title="Repeat"
          divider
        />
        <Box
          as={ScrollView}
          flex={1}
          px="4"
          py="4"
          contentContainerStyle={{paddingBottom: 100}}>
          {Object.keys(EVENT_ALERTS).map(k => (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              key={k}
              mx="2"
              mb="1"
              py="3"
              borderBottomWidth={2}
              borderBottomColor={theme['grey-0']}>
              <Text category="p2" color={theme['grey-400']}>
                {stringifyEnumKey(k)}
              </Text>
              <Radio
                checked={alert === EVENT_ALERTS[k]}
                onChange={() => setAlert(EVENT_ALERTS[k])}
              />
            </Box>
          ))}
        </Box>
        <Box
          as={LinearGradient}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          locations={[0.4, 1]}
          colors={[
            theme['color-primary-500' && 'background-basic-color-1'],
            '#ffffff00',
          ]}
          position="absolute"
          left={0}
          right={0}
          bottom={0}>
          <Box
            px="4"
            pb={40}
            pt={60}
            // backgroundColor={theme['color-basic-control-transparent-800']}
          >
            <Button shape="circle" size="giant" onPress={onSelect}>
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectAlert;
