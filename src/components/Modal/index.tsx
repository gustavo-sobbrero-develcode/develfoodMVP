import React, {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  Container,
  Description,
  ObservationInput,
  RestaurantName,
  Title,
} from './styles';

type Props = {
  title: string;
  description: string;
  name: string;
};

export function Modal({title, description, name}: Props) {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  const ModalHeight = Dimensions.get('screen').height * 0.58;

  return (
    <>
      <Modalize
        ref={modalizeRef}
        modalHeight={ModalHeight}
        modalStyle={{borderTopStartRadius: 30, borderTopEndRadius: 30}}>
        <Title>{title}</Title>
        <Container>
          <Description>
            {description}
            <RestaurantName> {name}</RestaurantName>
          </Description>
          <ObservationInput />
        </Container>
      </Modalize>
    </>
  );
}
