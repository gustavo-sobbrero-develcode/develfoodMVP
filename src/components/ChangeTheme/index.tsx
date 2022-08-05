import {useThemeProvider} from '@global/context/Theme';
import React, {useRef} from 'react';
import {Dimensions, Image} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useTheme} from 'styled-components';
import {
  Content,
  ModalizeContent,
  ThemeContainer,
  ThemeContent,
  ThemeText,
  ThemeTitle,
} from './styles';

export function ChangeTheme() {
  const {themeSelect, SetDeviceTheme} = useThemeProvider();
  const theme = useTheme();

  function getStatusImage(themeSet: string) {
    const themeSetted = {
      default: theme.icons.default,
      light: theme.icons.light,
      dark: theme.icons.dark,
    }[themeSet];
    return themeSetted;
  }
  const modalizeRef = useRef<Modalize>(null);

  const ModalHeight = Dimensions.get('screen').height * 0.265;

  const themeSetted = getStatusImage(themeSelect);

  return (
    <>
      <Content onPress={() => modalizeRef.current?.open()}>
        <Image
          style={{height: 30, width: 30, tintColor: theme.colors.icon_black}}
          source={themeSetted}
        />
      </Content>
      <Modalize
        closeAnimationConfig={{timing: {duration: 500}}}
        onBackButtonPress={() => false}
        closeSnapPointStraightEnabled={false}
        ref={modalizeRef}
        modalHeight={ModalHeight}
        modalStyle={{
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
        }}>
        <ModalizeContent style={{height: ModalHeight}}>
          <ThemeTitle>Tema</ThemeTitle>
          <ThemeContainer>
            <ThemeContent
              onPress={() => {
                SetDeviceTheme('light');
                modalizeRef.current?.close();
              }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  tintColor:
                    themeSelect === 'light'
                      ? theme.colors.icon_red
                      : theme.colors.icon_black,
                }}
                source={theme.icons.light}
              />
              <ThemeText
                style={{
                  color:
                    themeSelect === 'light'
                      ? theme.colors.icon_red
                      : theme.colors.icon_black,
                }}>
                Claro
              </ThemeText>
            </ThemeContent>
            <ThemeContent
              onPress={() => {
                SetDeviceTheme('default');
                modalizeRef.current?.close();
              }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  tintColor:
                    themeSelect === 'default'
                      ? theme.colors.icon_red
                      : theme.colors.icon_black,
                }}
                source={theme.icons.default}
              />
              <ThemeText
                style={{
                  color:
                    themeSelect === 'default'
                      ? theme.colors.icon_red
                      : theme.colors.icon_black,
                }}>
                Padrão
              </ThemeText>
            </ThemeContent>
            <ThemeContent
              onPress={() => {
                SetDeviceTheme('dark');
                modalizeRef.current?.close();
              }}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                  tintColor:
                    themeSelect === 'dark'
                      ? theme.colors.icon_red
                      : theme.colors.icon_black,
                  marginBottom: 5,
                }}
                source={theme.icons.dark}
              />
              <ThemeText
                style={{
                  color:
                    themeSelect === 'dark'
                      ? theme.colors.icon_red
                      : theme.colors.icon_black,
                }}>
                Escuro
              </ThemeText>
            </ThemeContent>
          </ThemeContainer>
        </ModalizeContent>
      </Modalize>
    </>
  );
}
