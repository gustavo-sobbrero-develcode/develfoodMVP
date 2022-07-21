import {ContinueButton} from '@components/ContinueButton';
import {EvaluationBar} from '@components/EvaluationBar';
import {useAuth} from '@global/context';
import {usePost} from '@global/services/post';
import theme from '@global/styles/theme';
import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Container, Description, RestaurantName, Title} from './styles';

type Props = {
  title: string;
  description: string;
  name: string;
  restaurantId: number;
};

export function EvaluationModal({
  title,
  description,
  name,
  restaurantId,
}: Props) {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  const ModalHeight = Dimensions.get('screen').height * 0.605;

  const [observation, setObservation] = useState('');
  const [data, setData] = useState('');

  const childToParent = (childdata: SetStateAction<string>) => {
    setData(childdata);
  };
  const {token} = useAuth();
  console.log(token);

  const {
    // data: dataPost,
    loading,
    handlerPost,
  } = usePost<any, any>('/restaurantEvaluation', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const requestBody = {
    grade: data,
    observation: observation,
    restaurant: {
      id: restaurantId,
    },
  };

  function onError() {
    Alert.alert(
      'Erro ao avaliar o restaurante, verifique sua conexão com a internet',
    );
  }

  function onSuccess() {
    modalizeRef.current?.close();
  }

  async function handlerPostEvaluation() {
    await handlerPost(
      requestBody,
      () => onError(),
      () => onSuccess(),
    );
    console.log(requestBody);
  }

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
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
          <ContinueButton
            disabled={!data}
            title="Enviar"
            onPressed={() => {
              handlerPostEvaluation();
            }}
            loading={loading}
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
