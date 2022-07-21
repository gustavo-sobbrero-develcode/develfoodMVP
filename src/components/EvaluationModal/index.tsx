/* eslint-disable prettier/prettier */
import {ContinueButton} from '@components/ContinueButton';
import {EvaluationBar} from '@components/EvaluationBar';
import theme from '@global/styles/theme';
import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Container, Description, RestaurantName, Title} from './styles';

type Props = {
  title: string;
  description: string;
  name: string;
  type: 'evaluation' | 'choice';
};

export function EvaluationModal({title, description, name, type}: Props) {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  const ModalHeight = Dimensions.get('screen').height * 0.58;

  const [observation, setObservation] = useState('');

  const [data, setData] = useState('');
  const childToParent = (childdata: SetStateAction<string>) => {
    setData(childdata);
  };

  function closeModal() {
    modalizeRef.current?.close();
  }

  function handlerPostEvaluation() {
    closeModal();
  }

  return (
    <>
      <Modalize
        closeAnimationConfig={{timing: {duration: 1500}}}
        onBackButtonPress={() => false}
        closeSnapPointStraightEnabled={false}
        closeOnOverlayTap={false}
        threshold={Infinity}
        velocity={Infinity}
        ref={modalizeRef}
        modalHeight={ModalHeight}
        modalStyle={styles.modalStyle}>
        <Title>{title}</Title>
        <Container>
          <Description>
            {description}
            <RestaurantName> {name}</RestaurantName>
          </Description>
          {type === 'evaluation' && (
            <>
              <EvaluationBar childToParent={childToParent} />
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={6}
                placeholder="Conte-nos um pouco deste restaurante..."
                placeholderTextColor="#020202"
                blurOnSubmit
                textAlignVertical="top"
                onChangeText={text => {
                  setObservation(text);
                }}
              />
            </>
          )}
          <ContinueButton
            disabled={!data}
            title="Enviar"
            onPressed={() => {
              handlerPostEvaluation();
              console.log('stars', data, observation);
            }}
            loading={false}
          />
        </Container>
      </Modalize>
    </>
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
