<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} -
        {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total }}</p>
    <button @click="checkout">Checkout</button>
    <p v-if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script lang="ts">
import { Product } from "../store";

export default {
  name: "ShoppingCart",
  data() {
    return {
      real: { style: "currency", currency: "BRL" },
    };
  },
  computed: {
    products<Product>() {
      // console.log(this.$store.getters.cartProducts);
      return this.$store.getters.cartProducts;
    },
    total() {
      return this.$store.getters.cartTotal;
    },
  },

  methods: {
    checkout() {
      this.$store.dispatch("checkout");
    },
  },
};
</script>

<style></style>
