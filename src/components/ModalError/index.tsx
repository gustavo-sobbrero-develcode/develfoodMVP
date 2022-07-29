import theme from '@global/styles/theme';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Button, ButtonText, ModalContent, ModalTitle} from './styles';

interface ModalErrorProps {
  modalErrorRef: React.RefObject<Modalize>;
}

export function ModalError({modalErrorRef}: ModalErrorProps) {
  const ModalHeight = Dimensions.get('screen').height * 0.345;

  return (
    <Modalize
      closeAnimationConfig={{timing: {duration: 500}}}
      onBackButtonPress={() => false}
      closeSnapPointStraightEnabled={false}
      ref={modalErrorRef}
      modalHeight={ModalHeight}
      modalStyle={styles.modalStyle}>
      <ModalContent>
        <ModalTitle>
          Ocorreu um erro, verifique as informações ou tente novamente mais
          tarde
        </ModalTitle>
        <Button
          onPress={() => {
            modalErrorRef.current?.close();
          }}>
          <ButtonText>OK</ButtonText>
        </Button>
      </ModalContent>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 23,
    borderColor: theme.colors.text_gray,
    borderWidth: 1,
    borderRadius: 10,
  },
  modalStyle: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
