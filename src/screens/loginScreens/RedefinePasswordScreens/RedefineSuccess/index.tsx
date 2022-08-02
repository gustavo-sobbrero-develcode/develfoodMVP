import React from 'react';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';

import {
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {Container, Content, Title, Description} from './styles';
import {ContinueButton} from '@components/ContinueButton';
import {HeaderComponent} from '@components/HeaderComponent';

export function RedefineSuccess() {
  const theme = useTheme();

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle={theme.barStyles.dark}
          />
          <HeaderComponent
            backgroudColor={theme.colors.background}
            name=""
            Textcolor={theme.colors.text_dark}
            source={theme.icons.exitWhite}
            iconColor={theme.colors.text_dark}
            onPress={() => navigation.navigate('Login' as never)}
          />
          <Content>
            <Image source={theme.images.redefineSuccess} />

            <Title>Senha redefinida!</Title>
            <Description>
              Sua senha foi redefinida com sucesso! Agora você pode aproveitar
              todos os serviços Develfood!
            </Description>

            <ContinueButton
              onPressed={() => navigation.navigate('Login' as never)}
              title="Confirmar"
            />
          </Content>
        </>
      </Container>
    </TouchableWithoutFeedback>
  );
}
