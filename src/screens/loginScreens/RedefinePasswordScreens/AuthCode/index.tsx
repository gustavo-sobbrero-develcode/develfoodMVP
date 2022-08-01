import React from 'react';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';

import {
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  Content,
  Title,
  Description,
  StepBar,
  SectionStepSelected,
  SectionStep,
  AuthText,
} from './styles';
import {ContinueButton} from '@components/ContinueButton';
import {HeaderComponent} from '@components/HeaderComponent';
import {useRedefinePassword} from '@global/context/RedefinePassword';

export function AuthCode() {
  const theme = useTheme();

  const {token} = useRedefinePassword();

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <>
          <StatusBar hidden />
          <HeaderComponent
            backgroudColor={theme.colors.background}
            name=""
            Textcolor={theme.colors.text_dark}
            source={theme.icons.arrow}
            onPress={() => navigation.navigate('Login' as never)}
          />
          <Content>
            <StepBar>
              <SectionStepSelected />
              <SectionStepSelected />
              <SectionStep />
            </StepBar>
            <Image source={theme.images.authEmail} />

            <Title>Código de validação</Title>
            <Description>
              Copie ou anote este código, ele será utilizado para você finalizar
              a recuperação de senha!
            </Description>

            <AuthText selectable={true}>{token}</AuthText>

            <ContinueButton
              onPressed={() => navigation.navigate('RedefinePassword' as never)}
              title="Continuar"
            />
          </Content>
        </>
      </Container>
    </TouchableWithoutFeedback>
  );
}
