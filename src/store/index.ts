import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

import shop, { Product } from "../api/shop";

export interface State {
  products: Array<any>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    products: [],
  },

  getters: {
    availableProducts(state, _getters) {
      return state.products.filter((product) => product.inventory > 0);
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

    // addToCart(context, product: Product) {
    //   if (product.inventory > 0) {
    //     context.commit("pushProductToCart", product);
    //   } else {
    //     //show out of stock message
    //   }
    // },
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
});
