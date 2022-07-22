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
  DevsScrollView,
  GetStartedButton,
  GetStartedText,
  GetStartedWrapper,
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
            Nosso trabalho é encher sua barriga {'\n'}com comida deliciosa, com
            sabor e{'\n'}
            entrega grátis.
          </AboutText>

          <WrapperImage>
            <LogoDevelFood source={theme.images.develFoodLogo} />
          </WrapperImage>
        </AboutContent>

        <GetStartedWrapper>
          <GetStartedButton
            onPress={() => navigation.navigate('Home' as never)}>
            <GetStartedText>Get Started</GetStartedText>
          </GetStartedButton>
        </GetStartedWrapper>

        <TimeText>Conheça nossos Devs</TimeText>

        <DevsScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DevsComponent
            name="Carla"
            source={theme.images.carlaMelhorAgilista}
          />
          <DevsComponent name="Diógenes" source={theme.images.eu} />
          <DevsComponent name="Gustavo" source={theme.images.gustaGol} />
          <DevsComponent name="Isaias" source={theme.images.isaias} />
          <DevsComponent name="Kevin" source={theme.images.kevinCareca} />
          <DevsComponent name="Manoela" source={theme.images.manoela} />
          <DevsComponent name="Michael" source={theme.images.michael} />
        </DevsScrollView>
        <TimeDevelfood source={theme.images.timeDevelFood} />
      </Content>
    </Container>
  );
}
