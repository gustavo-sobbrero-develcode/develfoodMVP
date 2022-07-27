import React, {createContext, useState} from 'react';
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

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Props {
  createUserAccount: Function;
  loading: boolean;
  handleSetPostData: (_postData: CreateUserPost) => void;
  postData: CreateUserPost;
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
  role?: {
    id: number;
  };
  costumer?: {
    firstName?: string;
    lastName?: string;
    cpf?: string;
    phone?: string;
    photo?: {
      code: string;
    };
    address?: CreateUserAddress[];
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

  const [postData, setPostData] = useState<CreateUserPost>(
    {} as CreateUserPost,
  );

  function handleSetPostData(dataPost: CreateUserPost) {
    setPostData({...postData, ...dataPost});
  }

  const createUserError = () => {
    Alert.alert('Erro', 'Usuário já existe ou dados inválidos');
  };

  async function createUserAccount(
    createUserSuccess: () => void,
    requestData: CreateUserPost,
  ) {
    const createUserRequest: CreateUserPost = {
      ...requestData,
      role: {id: 2},
    };
    await handlerPost(createUserRequest, createUserError, createUserSuccess);
  }

  return (
    <createUser.Provider
      value={{createUserAccount, loading, handleSetPostData, postData}}>
      {children}
    </createUser.Provider>
  );
}

function useCreateUser() {
  const Context = useContext(createUser);

  return Context;
}

export {useCreateUser, CreateUserProvider};
