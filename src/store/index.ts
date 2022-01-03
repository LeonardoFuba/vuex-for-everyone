import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import shop from "../api/shop";

export interface Product {
  id: number;
  title: string;
  price: number;
  inventory: number;
}

export interface CartItem {
  id: number;
  title?: string;
  price?: number;
  quantity: number;
}

export interface State {
  products: Array<Product>;
  cart: Array<CartItem>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    products: [],
    cart: [],
  },

  getters: {
    availableProducts(state, _getters) {
      return state.products.filter((product) => product.inventory > 0);
    },

    cartProducts(state: State, _getters) {
      return state.cart.map((cartItem: CartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id,
        );
        return {
          id: product?.id,
          title: product?.title,
          price: product?.price,
          quantity: cartItem.quantity,
        };
      });
    },

    cartTotal(state: State, getters) {
      return getters.cartProducts.reduce(
        (total: number, product: CartItem) =>
          total + (product.price || 0) * product.quantity,
        0,
      );
    },
  },

  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve, _reject) => {
        shop.getProducts((products: Product[]) => {
          commit("setProducts", products);
          resolve(true);
        });
      });
    },

    addProductToCart(context, product: Product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(
          (item) => item.id === product.id,
        );

        if (!cartItem) {
          context.commit("pushProductToCart", product.id);
        } else {
          context.commit("incrementItemQuantity", cartItem);
        }
        context.commit("decrementProductInventory", product);

        //
      } else {
        //show out of stock message
      }
    },
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },

    incrementItemQuantity(state, cartItem: CartItem) {
      cartItem.quantity++;
    },

    decrementProductInventory(state, product: Product) {
      product.inventory--;
    },
  },
});
