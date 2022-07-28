/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {useTheme} from 'styled-components';
import {Input} from '@components/Input';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {InputMask} from '@components/InputMask';

import {
  Dimensions,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  InputWrapper,
  RowView,
  StateWrapper,
  NumberWrapper,
  CepWrapper,
  NicknameWrapper,
  ButtonWrapper,
  ContentScroll,
  ContentScrollContainer,
  ModalContent,
  ModalTitle,
  PickPhoto,
  TakePhoto,
  ButtonText,
} from './styles';
import {HeaderComponent} from '@components/HeaderComponent';
import {ContinueButton} from '@components/ContinueButton';
import {InputWrapperComponent} from '@components/InputWrapper';
import api from '@global/services/api';
import {useAuth} from '@global/context';
import ImagePicker from 'react-native-image-crop-picker';
import {ProfileImage} from '@components/ProfileImage';
import {Modalize} from 'react-native-modalize';
import theme from '@global/styles/theme';
import {ModalError} from '@components/ModalError';

interface FormData {
  name: string;
  lastName: string;
  cpf: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  cep: string;
  email: string;
  zipCode: string;
  state: string;
  nickname: string;
}

interface GetDataProps {
  id: number;
  costumer: {
    address: [
      {
        city: string;
        id: number;
        neighborhood: string;
        nickname: string;
        number: string;
        state: string;
        street: string;
        zipCode: string;
      },
    ];
    cpf: string;
    firstName: string;
    id: number;
    lastName: string;
    phone: string;
    photo_url: string;
  };
  email: string;
  role: {
    id: number;
    name: string;
    authority: string;
  };
  restaurant: null;
}

const schema = Yup.object().shape({
  phone: Yup.string().min(15, 'Telefone inválido.'),
  street: Yup.string(),
  city: Yup.string(),
  neighborhood: Yup.string(),
  number: Yup.number().typeError('Apenas numeros são aceitos'),
  cep: Yup.string(),
  state: Yup.string().uppercase(),
  nickname: Yup.string(),
});

export function EditProfile() {
  const navigation = useNavigation();

  const theme = useTheme();

  const [photoid, setPhoto] = React.useState();
  const [getLoading, setGetLoading] = React.useState(false);

  const {token} = useAuth();

  const [imageProfile, setImageProfile] = React.useState<string>();

  const [photoProfile, setPhotoProfile] = React.useState<string>();

  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState<GetDataProps>();

  const modalizeRef = useRef<Modalize>(null);
  const modalErrorRef = useRef<Modalize>(null);

  const ModalHeight = Dimensions.get('screen').height * 0.345;

  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  async function onSubmit() {
    setLoading(true);
    await api
      .put(
        `/costumer/${data?.costumer.id}`,
        {
          address: [
            {
              city: getValues('city')
                ? getValues('city')
                : data?.costumer.address[0].city,
              id: data?.costumer.address[0].id,
              neighborhood: getValues('neighborhood')
                ? getValues('neighborhood')
                : data?.costumer.address[0].neighborhood,
              nickname: getValues('nickname')
                ? getValues('nickname')
                : data?.costumer.address[0].nickname,
              number: getValues('number')
                ? getValues('number')
                : data?.costumer.address[0].number,
              state: getValues('state')
                ? getValues('state')
                : data?.costumer.address[0].state,
              street: getValues('street')
                ? getValues('street')
                : data?.costumer.address[0].street,
              zipCode: getValues('cep')
                ? getValues('cep')
                : data?.costumer.address[0].zipCode,
            },
          ],
          cpf: data?.costumer.cpf,
          firstName: data?.costumer.firstName,
          id: data?.costumer.id,
          lastName: data?.costumer.lastName,
          phone: getValues('phone') ? getValues('phone') : data?.costumer.phone,
          photo: {
            code: imageProfile ? imageProfile : photoProfile,
            id: photoid,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {
        modalErrorRef.current?.open();
      });
    setLoading(false);
  }

  function choosePhotoFromLibrary() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      forceJpg: true,
    }).then(image => {
      setImageProfile(image.data);
    });
  }

  function takePhotoFromCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      forceJpg: true,
    }).then(image => {
      setImageProfile(image.data);
    });
  }

  async function GetData() {
    setGetLoading(true);
    await api
      .get('/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setData(response.data);
        api
          .get(`${response.data.costumer.photo_url}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(responseP => {
            setPhoto(responseP.data.id);
            setPhotoProfile(responseP.data.code);
          });
      });
    setGetLoading(false);
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <HeaderComponent
          name=""
          source={theme.icons.exitWhite}
          onPress={() => navigation.goBack()}
          backgroudColor={theme.colors.background}
          iconColor={theme.colors.text_dark}
        />
        <ContentScroll showsVerticalScrollIndicator={false}>
          <ContentScrollContainer activeOpacity={1}>
            <ProfileImage
              loading={getLoading}
              url={imageProfile ? imageProfile : photoProfile}
              onPress={() => modalizeRef.current?.open()}
            />

            <InputWrapper>
              <InputWrapperComponent title="Nome">
                <Input
                  editable={false}
                  keyboardType="email-address"
                  source={theme.icons.name}
                  defaultValue={data?.costumer.firstName}
                />
              </InputWrapperComponent>

              <InputWrapperComponent title="Sobrenome">
                <Input
                  editable={false}
                  keyboardType="email-address"
                  source={theme.icons.name}
                  defaultValue={data?.costumer.lastName}
                />
              </InputWrapperComponent>
              <InputWrapperComponent title="CPF">
                <Input
                  editable={false}
                  keyboardType="email-address"
                  defaultValue={data?.costumer.cpf}
                  source={theme.icons.cpf}
                />
              </InputWrapperComponent>
              <InputWrapperComponent title="Telefone">
                <Controller
                  control={control}
                  rules={{required: true}}
                  render={({field: {onChange, value}}) => (
                    <InputMask
                      source={theme.icons.phone}
                      defaultValue={data?.costumer.phone}
                      error={errors.phone && errors.phone.message}
                      editable={!getLoading}
                      onChangeText={onChange}
                      value={value}
                      placeholder={
                        getLoading === true
                          ? 'carregando...'
                          : data?.costumer.phone
                      }
                    />
                  )}
                  name="phone"
                />
              </InputWrapperComponent>
              <InputWrapperComponent title="E-Mail">
                <Input
                  editable={false}
                  defaultValue={data?.email}
                  keyboardType="email-address"
                  source={theme.icons.email}
                />
              </InputWrapperComponent>
            </InputWrapper>
            <RowView>
              <NicknameWrapper>
                <InputWrapperComponent title="Apelido">
                  <Controller
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value}}) => (
                      <Input
                        editable={!getLoading}
                        error={errors.nickname && errors.nickname.message}
                        keyboardType="email-address"
                        placeholder={
                          getLoading === true
                            ? 'carregando...'
                            : data?.costumer.address[0].nickname
                        }
                        source={theme.icons.locale}
                        name="nickname"
                        onChangeText={onChange}
                        value={value}
                        maxLength={8}
                      />
                    )}
                    name="nickname"
                  />
                </InputWrapperComponent>
              </NicknameWrapper>

              <CepWrapper>
                <InputWrapperComponent title="CEP">
                  <Controller
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value}}) => (
                      <Input
                        editable={!getLoading}
                        error={errors.cep && errors.cep.message}
                        keyboardType="email-address"
                        placeholder={
                          getLoading === true
                            ? 'carregando...'
                            : data?.costumer.address[0].zipCode
                        }
                        source={theme.icons.locale}
                        name="CEP"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="cep"
                  />
                </InputWrapperComponent>
              </CepWrapper>
            </RowView>
            <InputWrapperComponent title="Rua">
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    editable={!getLoading}
                    error={errors.street && errors.street.message}
                    keyboardType="email-address"
                    placeholder={
                      getLoading === true
                        ? 'carregando...'
                        : data?.costumer.address[0].street
                    }
                    source={theme.icons.locale}
                    name="street"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="street"
              />
            </InputWrapperComponent>
            <InputWrapperComponent title="Cidade">
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    editable={!getLoading}
                    error={errors.city && errors.city.message}
                    keyboardType="email-address"
                    placeholder={
                      getLoading === true
                        ? 'carregando...'
                        : data?.costumer.address[0].city
                    }
                    source={theme.icons.locale}
                    name="city"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="city"
              />
            </InputWrapperComponent>
            <InputWrapperComponent title="Bairro">
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    editable={!getLoading}
                    error={errors.neighborhood && errors.neighborhood.message}
                    keyboardType="email-address"
                    placeholder={
                      getLoading === true
                        ? 'carregando...'
                        : data?.costumer.address[0].neighborhood
                    }
                    source={theme.icons.locale}
                    name="neighborhood"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="neighborhood"
              />
            </InputWrapperComponent>
            <RowView>
              <StateWrapper>
                <InputWrapperComponent title="Estado">
                  <Controller
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value}}) => (
                      <Input
                        editable={!getLoading}
                        error={errors.state && errors.state.message}
                        keyboardType="email-address"
                        placeholder={
                          getLoading === true
                            ? 'carregando...'
                            : data?.costumer.address[0].state
                        }
                        source={theme.icons.locale}
                        name="state"
                        onChangeText={onChange}
                        value={value}
                        maxLength={2}
                      />
                    )}
                    name="state"
                  />
                </InputWrapperComponent>
              </StateWrapper>
              <NumberWrapper>
                <InputWrapperComponent title="Número">
                  <Controller
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value}}) => (
                      <Input
                        editable={!getLoading}
                        error={errors.number && errors.number.message}
                        keyboardType="email-address"
                        placeholder={
                          getLoading === true
                            ? 'carregando...'
                            : data?.costumer.address[0].number
                        }
                        source={theme.icons.locale}
                        name="number"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="number"
                  />
                </InputWrapperComponent>
              </NumberWrapper>
            </RowView>
            <ButtonWrapper>
              <ContinueButton
                title="Salvar"
                onPressed={handleSubmit(onSubmit)}
                loading={loading}
              />
            </ButtonWrapper>
          </ContentScrollContainer>
        </ContentScroll>
        <Modalize
          closeAnimationConfig={{timing: {duration: 500}}}
          onBackButtonPress={() => false}
          closeSnapPointStraightEnabled={false}
          ref={modalizeRef}
          modalHeight={ModalHeight}
          modalStyle={styles.modalStyle}>
          <ModalContent>
            <ModalTitle>Foto de Perfil</ModalTitle>
            <PickPhoto
              onPress={() => {
                choosePhotoFromLibrary();
                modalizeRef.current?.close();
              }}>
              <ButtonText>Galeria</ButtonText>
            </PickPhoto>
            <TakePhoto
              onPress={() => {
                takePhotoFromCamera();
                modalizeRef.current?.close();
              }}>
              <ButtonText>Tirar Foto</ButtonText>
            </TakePhoto>
          </ModalContent>
        </Modalize>
        <ModalError modalErrorRef={modalErrorRef} />
      </Container>
    </TouchableWithoutFeedback>
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
