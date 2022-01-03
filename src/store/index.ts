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
  checkoutStatus: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: () => ({
    products: [],
    cart: [],
    checkoutStatus: false,
  }),

  getters: {
    productIsInStock() {
      return (product: Product) => product.inventory > 0;
    },

    availableProducts(state, _getters) {
      return state.products.filter((product) => product.inventory > 0);
    },

    cartProducts(state, _getters) {
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

    cartTotal(state, getters) {
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

    addProductToCart({ state, commit, getters }, product: Product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find((item) => item.id === product.id);

        if (!cartItem) {
          commit("pushProductToCart", product.id);
        } else {
          commit("incrementItemQuantity", cartItem);
        }
        commit("decrementProductInventory", product);

        //
      } else {
        //show out of stock message
      }
    },

    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "fail");
        },
      );
    },
  },

  mutations: {
    setProducts(state, products: Product[]) {
      state.products = products;
    },

    pushProductToCart(state, productId: number) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },

    incrementItemQuantity(_state, cartItem: CartItem) {
      cartItem.quantity++;
    },

    decrementProductInventory(_state, product: Product) {
      product.inventory--;
    },

    setCheckoutStatus(state, status: boolean) {
      state.checkoutStatus = status;
    },

    emptyCart(state) {
      state.cart = [];
    },
  },
});
