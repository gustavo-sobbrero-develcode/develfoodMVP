/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StatusBar, StyleSheet, Modal, View, Animated} from 'react-native';
import {HeaderComponent} from '@components/HeaderComponent';
import {useTheme} from 'styled-components';
import {useFetch} from '@global/services/get';
import {useAuth} from '@global/context';
import {useEffect} from 'react';
import theme from '@global/styles/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {useRef} from 'react';

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
  ModalContent,
  CloseModal,
  CloseModalText,
  LogOutImage,
  MessageLogOut,
  LogOutButton,
  LogOutButtonText,
  Content,
  HelpButton,
  HelpIcon,
  HelpButtonText,
  HelpContent,
  ArrowImage,
  AboutContent,
  AboutButton,
  AboutIcon,
  AboutButtonText,
  LogOutContent,
  LogOutPageButton,
  LogOutIcon,
  LogOutPageButtonText,
  DeleteUserContent,
  DeleteUserButton,
  DeleteUserIcon,
  DeleteUserButtonText,
} from './styles';
import {useNavigation} from '@react-navigation/native';

interface CostumerProps {
  id: number;
  firstName: string;
  photo_url: string;
}
interface UserProps {
  costumer: CostumerProps;
}

interface Photo {
  id: number;
  code: string;
}

const ModalPoup = ({visible, children}: any) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const changeModalState = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        speed: 0.8,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  useEffect(() => {
    changeModalState();
  }, [visible]);
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export function Settings() {
  const theme = useTheme();

  const {token, logOut} = useAuth();

  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);

  const {data, fetchData} = useFetch<UserProps>('/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data: dataPhoto, fetchData: fetchPhoto} = useFetch<Photo>(
    `${data?.costumer?.photo_url}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  useEffect(() => {
    fetchData();
    fetchPhoto();
  }, [data]);
  return (
    <Container>
      <StatusBar
        hidden
        barStyle={'light-content'}
        backgroundColor={theme.colors.background}
      />
      <HeaderComponent
        name="Configurações"
        backgroudColor={theme.colors.background}
        Textcolor={theme.colors.text_dark}
      />

      <Content>
        <UserInfo>
          <UserPhoto
            source={
              dataPhoto.code
                ? {
                    uri: `data:image/jpg;base64,${dataPhoto.code}`,
                  }
                : theme.images.eu
            }
          />

          <UserInfoWrapper>
            <UserName>Seja bem vindo, {data?.costumer?.firstName}!</UserName>

            <UserEditInfoWrapper>
              <UserEditInfoText>Editar Perfil</UserEditInfoText>
              <UserEditInfoButton>
                <EditInfoIcon source={theme.icons.editInfo} />
              </UserEditInfoButton>
            </UserEditInfoWrapper>
          </UserInfoWrapper>
        </UserInfo>

        <HelpContent>
          <HelpButton onPress={() => navigation.navigate('About' as never)}>
            <HelpIcon source={theme.icons.help} />
            <HelpButtonText>Ajuda</HelpButtonText>
            <ArrowImage source={theme.icons.settingsArrow} />
          </HelpButton>
        </HelpContent>

        <AboutContent>
          <AboutButton onPress={() => navigation.navigate('About' as never)}>
            <AboutIcon source={theme.icons.about} />
            <AboutButtonText>Sobre o DevelFood</AboutButtonText>
            <ArrowImage source={theme.icons.settingsArrow} />
          </AboutButton>
        </AboutContent>

        <LogOutContent>
          <LogOutPageButton onPress={() => setIsVisible(true)}>
            <LogOutIcon source={theme.icons.logoutIcon} />
            <LogOutPageButtonText>Sair do App</LogOutPageButtonText>
            <ArrowImage source={theme.icons.settingsArrow} />
          </LogOutPageButton>
        </LogOutContent>

        <DeleteUserContent>
          <DeleteUserButton>
            <DeleteUserIcon source={theme.icons.deleteUserIcon} />
            <DeleteUserButtonText>Excluir Conta</DeleteUserButtonText>
            <ArrowImage source={theme.icons.settingsArrow} />
          </DeleteUserButton>
        </DeleteUserContent>
      </Content>

      <ModalPoup visible={isVisible}>
        <ModalContent>
          <LogOutImage source={theme.images.logoutImage} />
          <MessageLogOut>
            Oh no! You're Leaving... {'\n'} Are you sure?
          </MessageLogOut>
          <CloseModal onPress={() => setIsVisible(false)}>
            <CloseModalText>Naah, Just Kidding</CloseModalText>
          </CloseModal>
          <LogOutButton onPress={() => logOut()}>
            <LogOutButtonText>Yes, I'm sure</LogOutButtonText>
          </LogOutButton>
        </ModalContent>
      </ModalPoup>
    </Container>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: theme.colors.modalBackGround,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: theme.colors.background,
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(20),
    borderRadius: RFValue(10),
    elevation: RFValue(20),
  },
});
