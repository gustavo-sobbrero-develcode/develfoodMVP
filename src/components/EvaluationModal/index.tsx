import {ContinueButton} from '@components/ContinueButton';
import {EvaluationBar} from '@components/EvaluationBar';
import {useAuth} from '@global/context';
import {useFetch} from '@global/services/get';
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
  orderId: number;
};

type EvaluationBody = {
  grade: number;
  observation: string;
  restaurant: {
    id: number;
  };
};

type EvaluationData = {
  id: number;
  isEvaluated: boolean;
};

export function EvaluationModal({
  title,
  description,
  name,
  restaurantId,
  orderId,
}: Props) {
  const modalizeRef = useRef<Modalize>(null);

  const ModalHeight = Dimensions.get('screen').height * 0.605;

  const [observation, setObservation] = useState('');
  const [data, setData] = useState(0);

  const childToParent = (childdata: SetStateAction<number>) => {
    setData(childdata);
  };
  const {token} = useAuth();

  const {loading, handlerPost} = usePost<EvaluationBody, undefined>(
    '/restaurantEvaluation',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const requestBody: EvaluationBody = {
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
  }
  const {fetchData} = useFetch<EvaluationData>(`/request/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    (async () => {
      await fetchData(onSuccessFetch);
    })();
  }, []);

  function onSuccessFetch(response: EvaluationData) {
    if (response.isEvaluated === false) {
      modalizeRef.current?.open();
    }
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
              maxLength={100}
              style={styles.input}
              multiline
              numberOfLines={7}
              placeholder="Conte-nos um pouco deste restaurante..."
              placeholderTextColor="#020202"
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
