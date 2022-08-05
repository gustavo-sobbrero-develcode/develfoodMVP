import {useThemeProvider} from '@global/context/Theme';
import React, {useRef} from 'react';
import {Dimensions, Image} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useTheme} from 'styled-components';
import {Content, DarkCircle, DarkContent, ModalizeContent} from './styles';

export function ChangeTheme() {
  const {themeSelect, setThemeSelect} = useThemeProvider();
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
  const modalErrorRef = useRef<Modalize>(null);

  const ModalHeight = Dimensions.get('screen').height * 0.145;

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
          <DarkContent>
            <DarkCircle
              onPress={() => {
                setThemeSelect('light');
              }}
            />
            <DarkCircle
              onPress={() => {
                setThemeSelect('dark');
              }}
            />
            <DarkCircle
              onPress={() => {
                setThemeSelect('default');
              }}
            />
          </DarkContent>
        </ModalizeContent>
      </Modalize>
    </>
  );
}
