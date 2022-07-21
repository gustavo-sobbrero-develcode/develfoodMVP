import {DevsComponent} from '@components/DevsComponent';
import {HeaderComponent} from '@components/HeaderComponent';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTheme} from 'styled-components';
import {
  AboutContent,
  AboutText,
  AboutTitle,
  Container,
  Content,
  LogoDevelFood,
  TimeDevelfood,
  TimeText,
  WrapperImage,
} from './styles';

export function About() {
  const navigation = useNavigation();

  const theme = useTheme();

  return (
    <Container>
      <HeaderComponent
        name="Sobre"
        backgroudColor={theme.colors.background}
        Textcolor={theme.colors.text_dark}
        source={theme.icons.arrow}
        onPress={() => navigation.goBack()}
      />
      <Content>
        <AboutTitle>
          Encontre as melhores comidas {'\n'} ao seu redor
        </AboutTitle>

        <AboutContent>
          <AboutText>
            Nosso trabalho é encher sua barriga {'\n'}com comida deliciosa,
            {'\n'}
            com sabor e entrega grátis.
          </AboutText>

          <WrapperImage>
            <LogoDevelFood source={theme.images.develFoodLogo} />
          </WrapperImage>
        </AboutContent>

        <TimeText>Conheça nossos Devs</TimeText>
        <DevsComponent name="Diógenes" source={theme.images.eu} />
        <TimeDevelfood source={theme.images.timeDevelFood} />
      </Content>
    </Container>
  );
}
