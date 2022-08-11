import React, {createContext} from 'react';
import {useContext} from 'react';
import {Alert} from 'react-native';
import {usePost} from '@global/services/post';

interface CreateUserResponse {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: [
    {
      authority: string;
    },
  ];
  costumer: {
    address: [
      {
        city: string;
        id: 0;
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
    id: 0;
    lastName: string;
    phone: string;
    photo: {
      code: string;
      id: 0;
    };
  };
  creationDate: string;
  credentialsNonExpired: boolean;
  email: string;
  enabled: boolean;
  id: 0;
  password: string;
  restaurant: {
    address: {
      city: string;
      id: 0;
      neighborhood: string;
      nickname: string;
      number: string;
      state: string;
      street: string;
      zipCode: string;
    };
    cnpj: string;
    foodTypes: [
      {
        id: 0;
        name: string;
      },
    ];
    id: 0;
    name: string;
    phone: string;
    photo: {
      code: string;
      id: 0;
    };
  };
  role: {
    authority: string;
    id: 0;
    name: string;
  };
  username: string;
}

interface SignUpProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone: string;
  photo: {
    code: string;
  };
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipcode: string;
  state: string;
  nickname: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  createUserAccount: Function;
  loading: boolean;
}

interface CreateUserAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  nickname: string;
}

interface CreateUserPost {
  email: string;
  password: string;
  creationDate: Date;
  role: {
    id: number;
  };
  costumer: {
    firstName: string;
    lastName: string;
    cpf: string;
    phone: string;
    photo: {
      code: string;
    };
    address: CreateUserAddress[];
  };
}

const createUser = createContext({
  loading: false,
  createUserAccount: () => {},
  handleSetPostData: (_postData: Partial<CreateUserPost>) => {},
  postData: {} as CreateUserPost,
} as Props);

function CreateUserProvider({children}: AuthProviderProps) {
  const {handlerPost, loading} = usePost<CreateUserPost, CreateUserResponse>(
    '/user',
  );

  const createUserError = () => {
    Alert.alert('Erro', 'Usuário já existe ou dados inválidos');
  };

  async function createUserAccount(
    createUserSuccess: () => void,
    {
      email,
      password,
      firstName,
      lastName,
      cpf,
      phone,
      photo,
      street,
      number,
      neighborhood,
      city,
      zipcode,
      state,
      nickname,
    }: SignUpProps,
  ) {
    const signUpData = {
      email: email,
      password: password,
      creationDate: new Date(),
      role: {
        id: 2,
      },
      costumer: {
        firstName: firstName,
        lastName: lastName,
        cpf: cpf,
        phone: phone,
        photo: photo,
        address: [
          {
            street: street,
            number: number,
            neighborhood: neighborhood,
            city: city,
            zipCode: zipcode,
            state: state,
            nickname: nickname,
          },
        ],
      },
    };
    await handlerPost(signUpData, createUserError, createUserSuccess);
  }

  return (
    <createUser.Provider value={{createUserAccount, loading}}>
      {children}
    </createUser.Provider>
  );
}

function useCreateUser() {
  const Context = useContext(createUser);

  return Context;
}

export {useCreateUser, CreateUserProvider};
