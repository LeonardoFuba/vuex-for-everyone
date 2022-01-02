import { Store } from "vuex";
import { Product } from "../api/shop";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    products: Product;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
