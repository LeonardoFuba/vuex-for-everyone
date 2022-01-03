import { Store } from "vuex";
import { Product, CartItem, State } from "../store";

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
