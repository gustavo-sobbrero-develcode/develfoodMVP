/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StatusBar, StyleSheet, Modal, Text} from 'react-native';
import {HeaderComponent} from '@components/HeaderComponent';
import {useTheme} from 'styled-components';
import {useFetch} from '@global/services/get';
import {useAuth} from '@global/context';
import {useEffect} from 'react';

import {
  Container,
  EditInfoIcon,
  UserEditInfoButton,
  UserEditInfoText,
  UserEditInfoWrapper,
  UserInfo,
  UserInfoWrapper,
  UserName,
  UserPhoto,
  ButtonModal,
  ModalContent,
} from './styles';
import {View} from '@components/CategoryButton/styles';
import theme from '@global/styles/theme';

const ModalPoup = ({visible, children}: any) => {
  const [showModal, setShowModal] = useState(visible);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  useEffect(() => {
    toggleModal();
  }, [visible]);
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

export function Settings() {
  const theme = useTheme();

  const {token} = useAuth();

  const [isVisible, setIsVisible] = useState(false);

  const {data, fetchData} = useFetch('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.background}
      />
      <HeaderComponent
        name="Configurações"
        backgroudColor={theme.colors.background}
        Textcolor={theme.colors.text_dark}
      />

      <UserInfo>
        <UserPhoto source={theme.images.eu} />

        <UserInfoWrapper>
          <UserName>Seja bem vindo, Diógenes!</UserName>

          <UserEditInfoWrapper>
            <UserEditInfoText>Editar Perfil</UserEditInfoText>
            <UserEditInfoButton>
              <EditInfoIcon source={theme.icons.editInfo} />
            </UserEditInfoButton>
          </UserEditInfoWrapper>
        </UserInfoWrapper>
      </UserInfo>

      <ModalPoup visible={isVisible}>
        <ModalContent>
          <Text>OI</Text>
        </ModalContent>
      </ModalPoup>
      <ButtonModal onPress={() => setIsVisible(true)}>
        <Text>Teste</Text>
      </ButtonModal>
    </Container>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 20,
  },
});
