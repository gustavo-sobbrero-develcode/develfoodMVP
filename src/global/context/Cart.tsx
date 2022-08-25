import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useAuth} from '.';
import {useFetch} from '@global/services/get';
import {usePost} from '@global/services/post';
import axios from 'axios';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AddressRequest {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  nickname: string;
}

interface CostumerRequest {
  id: number;
  firstName: string;
  lastName: string;
  address: AddressRequest[];
  photo_url: string;
}

interface FoodTypeResponse {
  id: number;
  name: string;
}

interface RestaurantResponse {
  id: number;
  name: string;
  photo_url: string;
  food_types: FoodTypeResponse[];
}

interface PlateDTOResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  foodType: FoodTypeResponse;
  restaurantName: string;
  photo_url: string;
}

interface RequestItemResponse {
  id: number;
  plateDTO: PlateDTOResponse;
}

interface CartResponse {
  id: number;
  costumer: CostumerRequest;
  restaurant: RestaurantResponse;
  date: Date;
  dateLastUpdate: Date;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: RequestItemResponse[];
  quantity: number;
  price: number;
  observation: string;
}

interface ResquestItemsResponse {
  plate: {
    id: number;
    price: number;
  };
  quantity: number;
  price: number;
  observation: string;
}
export interface UserID {
  id: number;
}

interface CartRequest {
  costumer: {
    id: number;
  };
  restaurant: {
    id: number;
  };
  date: () => string;
  dateLastUpdate: () => string;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: ResquestItemsResponse[];
  restaurantPromotion: null;
}

interface Props {
  addNewProductoCart: Function;
  addProductToCart: Function;
  removeProductFromCart: Function;
  cleanUpSamePlates: Function;
  clearCart: Function;
  cart: ItemProps[];
  totalItems: number;
  total: number;
  nameRestaurant: string;
  restaurantId: number;
  foodTypes: string;
  restaurantPhoto: string;
  userRequestCheckout: Function;
  paramsToOrderDetails: Function;
  plateData: Plate;
  loading: boolean;
}

interface Plate {
  name: string;
  price: number;
  description: string;
  source: string;
  id: number;
  restaurantFoodTypes: string;
  restaurantName: string;
  favorite: boolean;
  inside: boolean;
  restaurantID: number;
  photoRestaurant: string;
}

interface ItemProps {
  id: number;
  quantity: number;
  price: number;
  restaurantID: number;
  name: string;
  description: string;
  source: string;
  restaurantFoodTypes: string;
  restaurantName: string;
  photoRestaurant: string;
  unityPrice: number;
}

const CartContext = createContext({} as Props);

function CartProvider({children}: AuthProviderProps) {
  const [cart, setCart] = useState<ItemProps[]>([]);

  const [total, setTotal] = useState(0);

  const [totalItems, setTotalItems] = useState<number>(0);

  const [nameRestaurant, setNameRestaurant] = useState('');

  const [foodTypes, setFoodTypes] = useState('');

  const [restaurantPhoto, setRestaurantPhoto] = useState('');

  const [restaurantId, setRestaurantId] = useState(0);

  function addNewProductoCart(
    id: number,
    price: number,
    restaurantID: number,
    name: string,
    description: string,
    source: string,
    restaurantFoodTypes: string,
    restaurantName: string,
    photoRestaurant: string,
  ) {
    const addProducts = [...cart];

    const item = addProducts.find((product: ItemProps) => product.id === id);

    const fromOtherRestaurant = addProducts.find(
      (product: ItemProps) => product.restaurantID !== restaurantID,
    );

    if (!fromOtherRestaurant) {
      if (!item) {
        addProducts.push({
          id,
          quantity: 1,
          price,
          unityPrice: price,
          restaurantID,
          name,
          description,
          source,
          restaurantFoodTypes,
          restaurantName,
          photoRestaurant,
        });
      } else {
        item.quantity += 1;
        item.price += price;
      }
      setCart(addProducts);
      setTotal(total + price);
      setTotalItems(totalItems + 1);
      setNameRestaurant(restaurantName);
      setFoodTypes(restaurantFoodTypes);
      setRestaurantPhoto(photoRestaurant);
      setRestaurantId(restaurantID);
    } else {
      Alert.alert(
        'Você já tem itens adicionados na sua sacola',
        'Deseja limpar o carrinho e adicionar este item?',
        [
          {
            text: 'Cancelar',
            onPress: () => {
              Alert.prompt;
            },
          },
          {
            text: 'Adicionar',
            onPress: () => {
              replaceCart(
                id,
                1,
                price,
                price,
                restaurantID,
                name,
                description,
                source,
                restaurantFoodTypes,
                restaurantName,
                photoRestaurant,
              );
            },
          },
        ],
      );
    }
  }

  function addProductToCart(
    id: number,
    price: number,
    restaurantID: number,
    name: string,
    description: string,
    source: string,
  ) {
    const addingProducts = [...cart];

    const item = addingProducts.find((product: ItemProps) => product.id === id);

    const fromOtherRestaurant = addingProducts.find(
      (product: ItemProps) => product.restaurantID !== restaurantID,
    );

    if (!fromOtherRestaurant) {
      if (!item) {
        addingProducts.push({
          id,
          quantity: 1,
          price,
          restaurantID,
          name,
          description,
          source,
          photoRestaurant: '',
          restaurantName: '',
          restaurantFoodTypes: '',
          unityPrice: price,
        });
      } else {
        item.quantity += 1;
        item.price += price;
      }
      setCart(addingProducts);
      setTotal(total + price);
      setTotalItems(totalItems + 1);
    }
  }

  function removeProductFromCart(id: number, price: number) {
    const removingProducts = [...cart];

    const item = removingProducts.find(
      (product: ItemProps) => product.id === id,
    );

    if (item && item.quantity > 1) {
      item.quantity -= 1;
      item.price -= price;
      setTotal(total - price);
      setCart(removingProducts);
      setTotalItems(totalItems - 1);
    } else {
      const filterCart = removingProducts.filter(
        (product: ItemProps) => product.id !== id,
      );
      setCart(filterCart);
      setTotal(total - price);
      setTotalItems(totalItems - 1);
    }
  }

  function cleanUpSamePlates(id: number) {
    const removeAllProducts = [...cart];

    const item = removeAllProducts.find(
      (product: ItemProps) => product.id === id,
    );

    if (item && item.quantity >= 1) {
      setTotal(total - item.price);
      setTotalItems(totalItems - item.quantity);
      setCart(
        removeAllProducts.filter((product: ItemProps) => product.id !== id),
      );
    }
  }

  function clearCart() {
    cart.splice(0, cart.length);
    setTotal(0);
    setTotalItems(0);
  }

  function replaceCart(
    id: number,
    quantity: number,
    price: number,
    unityPrice: number,
    restaurantID: number,
    name: string,
    description: string,
    source: string,
    restaurantFoodTypes: string,
    restaurantName: string,
    photoRestaurant: string,
  ) {
    const product = {
      id,
      quantity,
      price,
      unityPrice,
      restaurantID,
      name,
      description,
      source,
      restaurantFoodTypes,
      restaurantName,
      photoRestaurant,
    };
    cart.splice(0, cart.length, product);
    setTotal(unityPrice);
    setTotalItems(quantity);
    setNameRestaurant(restaurantName);
    setFoodTypes(restaurantFoodTypes);
    setRestaurantPhoto(photoRestaurant);
  }

  const {token} = useAuth();

  const {data, fetchData} = useFetch<UserID>('/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const {handlerPost, loading} = usePost<CartRequest, CartResponse>(
    '/request',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const cartError = () => {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao tentar realizar o pedido, tente novamente',
    );
  };

  const checkoutRequest = cart.map(item => {
    return {
      plate: {
        id: item.id,
        price: item.price,
      },
      quantity: item.quantity,
      price: item.price,
      observation: '',
    };
  });

  const postOrder = async () => {
    await axios
      .post(
        'https://4a8c-2804-14c-7d86-961f-a2d0-731d-3bd7-1d00.sa.ngrok.io/develfood/order',
        {
          restaurantId: restaurantId.toString(),
          userId: data.id.toString(),
          createdAt: new Date(),
        },
      )
      .then(() => {})
      .catch(() => {});
  };

  const getCoupon = async () => {
    await axios
      .get(
        `https://4a8c-2804-14c-7d86-961f-a2d0-731d-3bd7-1d00.sa.ngrok.io/develfood/order/${data.id}/${restaurantId}/${nameRestaurant}/code`,
      )
      .then(() => {})
      .catch(() => {});
  };

  async function userRequestCheckout(CheckoutUserSuccess: () => void) {
    postOrder();

    const createCheckoutRequest: CartRequest = {
      costumer: {
        id: data.id,
      },
      restaurant: {
        id: cart[0].restaurantID,
      },
      date: new Date().toString,
      dateLastUpdate: new Date().toString,
      totalValue: total,
      paymentType: 'card',
      status: 'PEDIDO_REALIZADO',
      requestItems: checkoutRequest,
      restaurantPromotion: null,
    };
    await handlerPost(createCheckoutRequest, cartError, CheckoutUserSuccess);
    getCoupon();
  }

  const [plateData, setPlateData] = useState<Plate>({} as Plate);

  function paramsToOrderDetails(
    name: string,
    price: number,
    description: string,
    source: string,
    id: number,
    restaurantFoodTypes: string,
    restaurantName: string,
    favorite: boolean,
    inside: boolean,
    restaurantID: number,
    photoRestaurant: string,
  ) {
    setPlateData({
      name: name,
      price: price,
      description: description,
      source: source,
      id: id,
      restaurantFoodTypes: restaurantFoodTypes,
      restaurantName: restaurantName,
      favorite: favorite,
      inside: inside,
      restaurantID: restaurantID,
      photoRestaurant: photoRestaurant,
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addNewProductoCart,
        addProductToCart,
        totalItems,
        total,
        removeProductFromCart,
        cleanUpSamePlates,
        clearCart,
        nameRestaurant,
        foodTypes,
        restaurantPhoto,
        restaurantId,
        userRequestCheckout,
        paramsToOrderDetails,
        plateData,
        loading,
      }}>
      {children}
    </CartContext.Provider>
  );
}

function useCreateCart() {
  const Context = useContext(CartContext);

  return Context;
}

export {useCreateCart, CartProvider};
