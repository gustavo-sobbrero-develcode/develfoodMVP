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
  UserPhotoNoPhoto,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {ProfilePageComponent} from '@components/ProfilePageComponent';

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

const CloseAppModal = ({visible, children}: any) => {
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
  const themeProps = useTheme();

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

  function userPhoto() {
    const photo = dataPhoto.code
      ? {
          uri: `data:image/jpg;base64,${dataPhoto.code}`,
        }
      : theme.images.eu;
    return photo;
  }

  const getUserPhoto = userPhoto();

  useEffect(() => {
    fetchData();
    fetchPhoto();
  }, [data]);

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={themeProps.colors.background}
      />
      <HeaderComponent
        name="Configurações"
        backgroudColor={themeProps.colors.background}
        Textcolor={themeProps.colors.text_dark}
      />

      <Content>
        <UserInfo>
          <UserPhotoNoPhoto source={theme.images.eu} />
          <UserPhoto source={getUserPhoto} />

          <UserInfoWrapper>
            <UserName>Seja bem vindo, {data?.costumer?.firstName}!</UserName>

            <UserEditInfoWrapper>
              <UserEditInfoText>Editar Perfil</UserEditInfoText>
              <UserEditInfoButton
                onPress={() => navigation.navigate('EditProfile' as never)}>
                <EditInfoIcon source={themeProps.icons.editInfo} />
              </UserEditInfoButton>
            </UserEditInfoWrapper>
          </UserInfoWrapper>
        </UserInfo>

        <ProfilePageComponent
          onPress={() => navigation.navigate('About' as never)}
          name="Ajuda"
          sourceArrowIcon={themeProps.icons.settingsArrow}
          sourceIcon={themeProps.icons.help}
        />

        <ProfilePageComponent
          onPress={() => navigation.navigate('About' as never)}
          name="Sobre o DevelFood"
          sourceArrowIcon={themeProps.icons.settingsArrow}
          sourceIcon={themeProps.icons.about}
        />

        <ProfilePageComponent
          onPress={() => setIsVisible(true)}
          name="Sair do App"
          sourceArrowIcon={themeProps.icons.settingsArrow}
          sourceIcon={themeProps.icons.logoutIcon}
        />

        <ProfilePageComponent
          onPress={() => setIsVisible(true)}
          name="Excluir Conta"
          sourceArrowIcon={themeProps.icons.settingsArrow}
          sourceIcon={themeProps.icons.deleteUserIcon}
        />
      </Content>

      <CloseAppModal visible={isVisible}>
        <ModalContent>
          <LogOutImage source={themeProps.images.logoutImage} />
          <MessageLogOut>
            Ah não! Você está saindo... {'\n'} Tem certeza?
          </MessageLogOut>
          <CloseModal onPress={() => setIsVisible(false)}>
            <CloseModalText>Naah, To só brincando</CloseModalText>
          </CloseModal>
          <LogOutButton onPress={() => logOut()}>
            <LogOutButtonText>Sim, to vazando</LogOutButtonText>
          </LogOutButton>
        </ModalContent>
      </CloseAppModal>
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
