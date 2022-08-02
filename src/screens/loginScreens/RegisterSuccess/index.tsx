import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTheme} from 'styled-components';
import {BackButton} from '@components/BackButton';
import {ContinueButton} from '@components/ContinueButton';
import {
  Container,
  Header,
  TittleWrapper,
  Title,
  Text,
  SubTitle,
  WrapperText,
  WrapperTitle,
  Content,
  WomanImage,
} from './styles';
import {StatusBar} from 'react-native';
import {HeaderComponent} from '@components/HeaderComponent';

export function RegisterSuccess() {
  const navigation = useNavigation();

  const theme = useTheme();

  function handlerBackButton() {
    navigation.navigate('Login' as never);
  }

  const {handleSubmit} = useForm();

  const onSubmit = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <Container>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.barStyles.dark}
      />
      <HeaderComponent
        backgroudColor={theme.colors.background}
        name="Cadastro"
        onPress={handlerBackButton}
        source={theme.icons.arrow}
        iconColor={theme.colors.icon_black}
      />

      <WomanImage source={theme.icons.womansuccess} />

      <Content>
        <WrapperTitle>
          <SubTitle>Cadastro Finalizado!</SubTitle>
        </WrapperTitle>

        <WrapperText>
          <Text>
            Parabéns! Agora você pode aproveitar nossas ofertas e serviços e
            economizar com super cupons Develfood.
          </Text>
        </WrapperText>

        <ContinueButton
          title="Continuar"
          onPressed={handleSubmit(onSubmit)}
          loading={false}
        />
      </Content>
    </Container>
  );
}
