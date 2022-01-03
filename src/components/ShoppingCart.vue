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
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ShoppingCart",
  data() {
    return {
      real: { style: "currency", currency: "BRL" },
    };
  },
  computed: {
    ...mapState(["checkoutStatus"]),
    ...mapGetters({ products: "cartProducts", total: "cartTotal" }),
  },

  methods: {
    ...mapActions(["checkout"]),
  },
};
</script>

<style></style>
