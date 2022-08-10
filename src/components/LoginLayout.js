import React from 'react';
import styled from 'styled-components/native';
import SafeAreaView from 'components/SafeAreaView';
import { ImageBackground, StyleSheet } from 'react-native';
import Button from 'components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ThemedGradient from './ThemedGradient';
import Box from './Box';
import Text from './Text';
import useTheme from 'hooks/useTheme';
import { IS_SMALLER } from 'styles/responsive';
import { t } from 'helpers/react';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

const Grid = styled(Box)`
  flex: 1;
  justify-content: space-between;
  overflow: scroll;
  padding-horizontal: 20;
  padding-vertical: 40;
`;

const Title = styled(Text)`
  width: 90%;
  justify-content: flex-end;
  align-self: center;
  text-align: center;
  text-transform: uppercase;
`;

const Subtitle = styled(Box)`
  width: 80%;
  align-self: center;
  justify-content: center;
`;

const Form = styled.ScrollView`
  flex-grow: 0;
`;

const FormButton = styled.View`
  margin-vertical: 15;
`;

const Actions = styled.View`
  justify-content: flex-end;
`;

const Action = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionButton = styled(Button)`
  margin-left: 15;
`;

const LoginLayout = ({
  background,
  title,
  subtitle,
  gradient,
  renderForm,
  actions,
}) => {
  const { form, button } = renderForm();
  const theme = useTheme();

  return (
    <Box flex={1}>
      <ThemedGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <ImageBackground
            source={background}
            style={styles.container}
            resizeMode="cover">
            {gradient && (
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
            )}
            <Box as={SafeAreaView} flex={1} justifyContent={"center"} >
              <Grid justifyContent={"center"} >
                <Box flex={IS_SMALLER ? 0.5 : 0.7} justifyContent={IS_SMALLER ? "center": "flex-end"}>
                  {t(title, <Title category="h1" status="control">
                    {title}
                  </Title>)}
                </Box>
                {t(subtitle, <Subtitle flex={subtitle ? 2 : (IS_SMALLER ? 0.18 : 0.5)}>
                  {subtitle && typeof subtitle === 'string' ? (
                    <Text category="p2" status="control" textAlign="center">
                      {subtitle}
                    </Text>
                  ) : (
                    subtitle
                  )}
                </Subtitle>)}
                <Box flex={4} >
                  <Box flex={3} justifyContent={"center"}>
                    <Form>{form}</Form>
                    <FormButton>{button}</FormButton>
                  </Box>
                  <Actions>
                    {actions &&
                      actions.map((action, i) => (
                        <Action key={i}>
                          <Text category="s3" status="control">
                            {action.text}
                          </Text>
                          <ActionButton
                            appearance="ghost"
                            // size="small"
                            textStyle={{
                              color: theme['color-accent2-default'],
                              fontSize: theme['text-subtitle-3-font-size'],
                            }}
                            onPress={action.onClick}>
                            {action.button}
                          </ActionButton>
                        </Action>
                      ))}
                  </Actions>
                </Box>
              </Grid>
            </Box>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </ThemedGradient>
    </Box>
  );
};

export default LoginLayout;
