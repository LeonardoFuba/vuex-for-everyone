<template>
  <v-row>
    <v-col>
      <h1>Lista de Produtos</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price }} - {{ product.inventory }}
          <button
            :disabled="!productIsInStock(product)"
            @click="addProductToCart(product)"
          >
            Add to cart
          </button>
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Product, State } from "../store";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ProductList",
  data() {
    return {};
  },

  computed: {
    ...mapState({ products(state: State) { return state.products; } }),
    ...mapGetters({ productIsInStock: "productIsInStock" }),
  },

  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
      addProductToCart: "addProductToCart",
    }),
  },

  created() {
    this.fetchProducts();
  },
};
</script>

<style></style>
