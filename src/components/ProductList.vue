<template>
  <v-row>
    <v-col>
      <h1>Lista de Produtos</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price }} - {{ product.inventory }}
          <button @click="addProductToCart(product)">Add to cart</button>
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Product } from "../store";

export default {
  name: "ProductList",
  data() {
    return {};
  },

  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },

  methods: {
    addProductToCart(product: Product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },

  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>

<style></style>
